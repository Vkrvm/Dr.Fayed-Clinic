const { PrismaClient } = require('@prisma/client');
const { hash } = require('bcryptjs');

async function resetPasswords() {
    console.log('--- Resetting Passwords ---');
    const prisma = new PrismaClient();

    // Default password for reset
    const newPasswordRaw = '123456';

    try {
        const hashedPassword = await hash(newPasswordRaw, 12);

        // Reset both users
        const emails = ['vkram101@icloud.com', 'admin@fayedclinic.com'];

        for (const email of emails) {
            const user = await prisma.user.update({
                where: { email },
                data: { password: hashedPassword }
            });
            console.log(`✅ Password reset for ${user.email} (Name: ${user.name})`);
        }

        console.log('\nSUCCESS: Both passwords set to "123456"');

    } catch (error) {
        console.error('Error resetting passwords:', error);
    } finally {
        await prisma.$disconnect();
    }
}

resetPasswords();
