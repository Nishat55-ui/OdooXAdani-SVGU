import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient() as any;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const maintenanceRequests = await prisma.maintenanceRequest.findMany();
      res.status(200).json(maintenanceRequests);
    } catch (error) {
      console.error('Error fetching maintenance requests:', error);
      res.status(500).json({ error: 'Failed to fetch maintenance requests' });
    }
  } else if (req.method === 'POST') {
    try {
      const {
        subject,
        status,
        priority,
        createdBy,
        team,
        maintenanceFor,
        equipment,
        workCenter,
        technician,
        category,
        duration,
        requestDate,
        scheduledDate,
        maintenanceType,
        company,
        notes,
        instructions,
      } = req.body;

      // Validation
      if (!subject) {
        return res.status(400).json({ error: 'Subject is required' });
      }

      const newRequest = await prisma.maintenanceRequest.create({
        data: {
          subject,
          status: status || 'New',
          priority: priority || 'Medium',
          createdBy: createdBy || 'User',
          team: team || '',
          maintenanceFor: maintenanceFor || 'Equipment',
          equipment: equipment || null,
          workCenter: workCenter || null,
          technician: technician || '',
          category: category || '',
          duration: duration || '00:00 hours',
          requestDate: requestDate || new Date().toISOString().split('T')[0],
          scheduledDate: scheduledDate || null,
          maintenanceType: maintenanceType || 'Corrective',
          company: company || 'Default Company',
          notes: notes || null,
          instructions: instructions || null,
        },
      });

      res.status(201).json(newRequest);
    } catch (error) {
      console.error('Error creating maintenance request:', error);
      res.status(500).json({ error: 'Failed to create maintenance request' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
