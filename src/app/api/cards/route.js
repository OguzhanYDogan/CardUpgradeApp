import { NextResponse } from "next/server";
import cards from "@/app/data/cards"; // Verileri burada tutuyoruz

export function GET() {
    return NextResponse.json(cards);
}
