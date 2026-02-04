const prisma = require('../config/db');

exports.createBackup = async (req, res, next) => {
    try {
        // Mock Backup Logic - In real app, this would dump DB to a file
        console.log("Starting backup...");
        await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate delay
        console.log("Backup complete.");

        // Log this action
        await prisma.activityLog.create({
            data: {
                userId: req.user.id,
                action: 'BACKUP',
                details: 'Manual system backup triggered',
                ip: req.ip || 'unknown'
            }
        });

        res.status(200).json({ success: true, message: 'Backup created successfully' });
    } catch (err) {
        next(err);
    }
}
