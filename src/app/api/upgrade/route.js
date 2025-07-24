import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const body = await request.json();

        const id = body?.id;

        if (!id) {
            return NextResponse.json({ message: 'ID eksik veya geçersiz' }, { status: 400 });
        }

        // Bu API sadece "upgrade isteği alındı" der
        return NextResponse.json({ success: true });
    } catch (err) {
        console.error('API /upgrade hatası:', err);
        return NextResponse.json({ message: 'Sunucu hatası veya geçersiz JSON' }, { status: 400 });
    }
}
