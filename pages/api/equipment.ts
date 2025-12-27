import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient() as any;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const equipment = await prisma.equipment.findMany();
      res.status(200).json(equipment);
    } catch (error) {
      console.error('Error fetching equipment:', error);
      res.status(500).json({ error: 'Failed to fetch equipment' });
    }
  } else if (req.method === 'POST') {
    try {
      const {
        name,
        code,
        category,
        status,
        location,
        lastMaintenanceDate,
        nextMaintenanceDate,
      } = req.body;

      // Validation
      if (!name || !code) {
        return res.status(400).json({ error: 'Name and code are required' });
      }

      const newEquipment = await prisma.equipment.create({
        data: {
          name,
          code,
          category: category || 'Uncategorized',
          status: status || 'Operational',
          location: location || '',
          lastMaintenanceDate: lastMaintenanceDate ? new Date(lastMaintenanceDate) : null,
          nextMaintenanceDate: nextMaintenanceDate ? new Date(nextMaintenanceDate) : null,
        },
      });

      res.status(201).json(newEquipment);
    } catch (error) {
      console.error('Error creating equipment:', error);
      res.status(500).json({ error: 'Failed to create equipment' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
