import { NextResponse } from 'next/server'

export function jsonOk<T>(data: T, init?: ResponseInit) {
  return NextResponse.json(data, { status: 200, ...init })
}

export function jsonError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status })
}
