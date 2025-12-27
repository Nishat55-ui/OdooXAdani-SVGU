import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient() as any;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const workcenters = await prisma.workCenter.findMany();
      res.status(200).json(workcenters);
    } catch (error) {
      console.error('Error fetching workcenters:', error);
      res.status(500).json({ error: 'Failed to fetch workcenters' });
    }
  } else if (req.method === 'POST') {
    try {
      const {
        name,
        code,
        tag,
        alternativeWorkcenters,
        costPerHour,
        capacityTimeEfficiency,
        oeeTarget,
        company,
      } = req.body;

      // Validation
      if (!name || !code) {
        return res.status(400).json({ error: 'Name and code are required' });
      }

      const newWorkcenter = await prisma.workCenter.create({
        data: {
          name,
          code,
          tag: tag || null,
          alternativeWorkcenters: alternativeWorkcenters || null,
          costPerHour: parseFloat(costPerHour) || 0,
          capacityTimeEfficiency: parseFloat(capacityTimeEfficiency) || 100,
          oeeTarget: parseFloat(oeeTarget) || 85,
          company: company || 'Default Company',
        },
      });

      res.status(201).json(newWorkcenter);
    } catch (error) {
      console.error('Error creating workcenter:', error);
      res.status(500).json({ error: 'Failed to create workcenter' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
