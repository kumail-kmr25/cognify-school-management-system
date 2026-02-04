const prisma = require('../config/db');

// Mock upload - in real app would use S3 or disk storage middleware result
exports.createResource = async (req, res, next) => {
    try {
        const { title, type, classId, fileUrl } = req.body;

        const resource = await prisma.resource.create({
            data: {
                title,
                type,
                classId: classId || null,
                fileUrl: fileUrl || 'https://example.com/demo.pdf', // Fallback
                uploaderId: req.user.id
            }
        });

        res.status(201).json({ success: true, data: resource });
    } catch (err) {
        next(err);
    }
};

exports.getResources = async (req, res, next) => {
    try {
        const resources = await prisma.resource.findMany({
            orderBy: { createdAt: 'desc' },
            include: { uploader: { select: { name: true } } }
        });
        res.status(200).json({ success: true, count: resources.length, data: resources });
    } catch (err) {
        next(err);
    }
};
