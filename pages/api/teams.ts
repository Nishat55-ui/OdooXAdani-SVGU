import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient() as any;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const teams = await prisma.team.findMany();
      const formattedTeams = teams.map((team: any) => ({
        ...team,
        members: team.members ? JSON.parse(team.members) : [],
      }));
      res.status(200).json(formattedTeams);
    } catch (error) {
      console.error('Error fetching teams:', error);
      res.status(500).json({ error: 'Failed to fetch teams' });
    }
  } else if (req.method === 'POST') {
    try {
      const { name, members, company } = req.body;

      // Validation
      if (!name) {
        return res.status(400).json({ error: 'Team name is required' });
      }
      if (!company) {
        return res.status(400).json({ error: 'Company is required' });
      }

      const newTeam = await prisma.team.create({
        data: {
          name,
          members: JSON.stringify(members || []),
          company,
        },
      });

      res.status(201).json({
        ...newTeam,
        members: members || [],
      });
    } catch (error) {
      console.error('Error creating team:', error);
      res.status(500).json({ error: 'Failed to create team' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
