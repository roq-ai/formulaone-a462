import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { raceValidationSchema } from 'validationSchema/races';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getRaces();
    case 'POST':
      return createRace();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getRaces() {
    const data = await prisma.race
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'race'));
    return res.status(200).json(data);
  }

  async function createRace() {
    await raceValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.timer?.length > 0) {
      const create_timer = body.timer;
      body.timer = {
        create: create_timer,
      };
    } else {
      delete body.timer;
    }
    const data = await prisma.race.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
