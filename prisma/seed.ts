import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.maintenanceRequest.deleteMany();
  await prisma.workCenter.deleteMany();
  await prisma.team.deleteMany();
  await prisma.equipment.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  // Create users
  const user = await prisma.user.create({
    data: {
      name: 'Rajesh Kumar',
      email: 'rajesh@techcorp.com',
      password: 'password123',
    },
  });

  // Create categories
  const categories = await Promise.all([
    prisma.category.create({ data: { name: 'Computers', description: 'Computer equipment' } }),
    prisma.category.create({ data: { name: 'Monitors', description: 'Display monitors' } }),
    prisma.category.create({ data: { name: 'Printers', description: 'Printing devices' } }),
    prisma.category.create({ data: { name: 'Network', description: 'Network equipment' } }),
  ]);

  // Create equipment
  const equipment = await Promise.all([
    prisma.equipment.create({
      data: {
        name: 'Dell Desktop',
        code: 'EQ-001',
        category: 'Computers',
        status: 'Operational',
        location: 'Office Floor 1',
      },
    }),
    prisma.equipment.create({
      data: {
        name: 'Samsung Monitor',
        code: 'EQ-002',
        category: 'Monitors',
        status: 'Operational',
        location: 'Office Floor 1',
      },
    }),
    prisma.equipment.create({
      data: {
        name: 'HP LaserJet Printer',
        code: 'EQ-003',
        category: 'Printers',
        status: 'Operational',
        location: 'Office Floor 2',
      },
    }),
    prisma.equipment.create({
      data: {
        name: 'CNC Machine 01',
        code: 'EQ-004',
        category: 'Industrial',
        status: 'Operational',
        location: 'Manufacturing Floor',
      },
    }),
  ]);

  // Create teams
  const teams = await Promise.all([
    prisma.team.create({
      data: {
        name: 'Internal Maintenance',
        members: JSON.stringify(['Rajesh Kumar', 'Priya Singh', 'Amit Patel']),
        company: 'TechCorp Industries',
      },
    }),
    prisma.team.create({
      data: {
        name: 'Metrology',
        members: JSON.stringify(['Vikram Sharma', 'Anjali Desai', 'Rohan Gupta']),
        company: 'Precision Manufacturing Ltd',
      },
    }),
    prisma.team.create({
      data: {
        name: 'Subcontractor',
        members: JSON.stringify(['Deepak Kumar', 'Neha Singh', 'Arjun Reddy']),
        company: 'Global Solutions Inc',
      },
    }),
  ]);

  // Create work centers
  const workcenters = await Promise.all([
    prisma.workCenter.create({
      data: {
        name: 'Assembly Center 1',
        code: 'WC-001',
        tag: 'High Volume',
        alternativeWorkcenters: 'Assembly Center 2',
        costPerHour: 5000,
        capacityTimeEfficiency: 85,
        oeeTarget: 85,
        company: 'TechCorp Industries',
      },
    }),
    prisma.workCenter.create({
      data: {
        name: 'CNC Machining Center',
        code: 'WC-002',
        tag: 'Precision',
        costPerHour: 8000,
        capacityTimeEfficiency: 90,
        oeeTarget: 88,
        company: 'Precision Manufacturing Ltd',
      },
    }),
  ]);

  // Create maintenance requests
  const maintenanceRequests = await Promise.all([
    prisma.maintenanceRequest.create({
      data: {
        subject: 'Printer Paper Jam',
        status: 'New',
        priority: 'Low',
        createdBy: user.name,
        team: teams[0].name,
        maintenanceFor: 'Equipment',
        equipment: equipment[2].name,
        technician: 'Amit Patel',
        category: 'Maintenance',
        duration: '1:00 hours',
        requestDate: new Date().toISOString().split('T')[0],
        maintenanceType: 'Corrective',
        company: 'TechCorp Industries',
        notes: 'Clear paper jam and run diagnostic',
        instructions: 'Turn off printer and clear jam',
      },
    }),
    prisma.maintenanceRequest.create({
      data: {
        subject: 'Monthly Preventive Maintenance',
        status: 'New',
        priority: 'Medium',
        createdBy: user.name,
        team: teams[0].name,
        maintenanceFor: 'Equipment',
        equipment: equipment[3].name,
        technician: 'Rajesh Kumar',
        category: 'Preventive',
        duration: '3:00 hours',
        requestDate: new Date().toISOString().split('T')[0],
        maintenanceType: 'Preventive',
        company: 'Precision Manufacturing Ltd',
        notes: 'Check all components and lubricate',
        instructions: 'Perform standard maintenance checklist',
      },
    }),
    prisma.maintenanceRequest.create({
      data: {
        subject: 'Monitor Screen Issues',
        status: 'In Progress',
        priority: 'High',
        createdBy: user.name,
        team: teams[1].name,
        maintenanceFor: 'Equipment',
        equipment: equipment[1].name,
        technician: 'Vikram Sharma',
        category: 'Repair',
        duration: '2:30 hours',
        requestDate: new Date().toISOString().split('T')[0],
        maintenanceType: 'Corrective',
        company: 'TechCorp Industries',
        notes: 'Display flickering intermittently',
        instructions: 'Check display cables and replace if needed',
      },
    }),
  ]);

  console.log('Seed data created successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
