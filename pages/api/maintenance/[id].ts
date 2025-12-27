import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient() as any;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let { id } = req.query;
  
  // Handle array case
  if (Array.isArray(id)) {
    id = id[0];
  }

  if (!id || isNaN(parseInt(id as string))) {
    return res.status(400).json({ error: 'Invalid ID' });
  }

  if (req.method === 'GET') {
    try {
      const maintenanceRequest = await prisma.maintenanceRequest.findUnique({
        where: { id: parseInt(id as string) },
      });
      if (!maintenanceRequest) {
        return res.status(404).json({ error: 'Maintenance request not found' });
      }
      res.status(200).json(maintenanceRequest);
    } catch (error) {
      console.error('Error fetching maintenance request:', error);
      res.status(500).json({ error: 'Failed to fetch maintenance request' });
    }
  } else if (req.method === 'PUT') {
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

      const updatedRequest = await prisma.maintenanceRequest.update({
        where: { id: parseInt(id as string) },
        data: {
          subject: subject || undefined,
          status: status || undefined,
          priority: priority || undefined,
          createdBy: createdBy || undefined,
          team: team || undefined,
          maintenanceFor: maintenanceFor || undefined,
          equipment: equipment || undefined,
          workCenter: workCenter || undefined,
          technician: technician || undefined,
          category: category || undefined,
          duration: duration || undefined,
          requestDate: requestDate || undefined,
          scheduledDate: scheduledDate || undefined,
          maintenanceType: maintenanceType || undefined,
          company: company || undefined,
          notes: notes || undefined,
          instructions: instructions || undefined,
        },
      });

      res.status(200).json(updatedRequest);
    } catch (error) {
      console.error('Error updating maintenance request:', error);
      res.status(500).json({ error: 'Failed to update maintenance request' });
    }
  } else if (req.method === 'DELETE') {
    try {
      await prisma.maintenanceRequest.delete({
        where: { id: parseInt(id as string) },
      });
      res.status(200).json({ message: 'Maintenance request deleted' });
    } catch (error) {
      console.error('Error deleting maintenance request:', error);
      res.status(500).json({ error: 'Failed to delete maintenance request' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
