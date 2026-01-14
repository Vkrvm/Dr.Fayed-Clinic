const { PrismaClient } = require('@prisma/client');

async function listUsers() {
    const prisma = new PrismaClient();
    try {
        const users = await prisma.user.findMany({
            select: { email: true, name: true, role: true }
        });
        console.log('--- Existing Users ---');
        users.forEach(u => {
            console.log(`- Email: ${u.email} | Name: ${u.name} | Role: ${u.role}`);
        });
    } catch (error) {
        console.error('Error listing users:', error);
    } finally {
        await prisma.$disconnect();
    }
}

listUsers();
