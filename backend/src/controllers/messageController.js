const prisma = require('../config/db');

exports.getMyMessages = async (req, res, next) => {
    try {
        const messages = await prisma.message.findMany({
            where: {
                OR: [
                    { recipientId: req.user.id },
                    { senderId: req.user.id }
                ]
            },
            include: {
                sender: { select: { name: true, id: true } },
                recipient: { select: { name: true, id: true } }
            },
            orderBy: { createdAt: 'desc' }
        });

        res.status(200).json({ success: true, count: messages.length, data: messages });
    } catch (err) {
        next(err);
    }
};

exports.sendMessage = async (req, res, next) => {
    try {
        const { recipientId, content } = req.body;
        const message = await prisma.message.create({
            data: {
                senderId: req.user.id,
                recipientId: recipientId || null,
                content
            }
        });
        res.status(201).json({ success: true, data: message });
    } catch (err) {
        next(err);
    }
}
