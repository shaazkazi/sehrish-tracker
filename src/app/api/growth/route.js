import { NextResponse } from 'next/server';
import db from '@/lib/sqlite';

export async function POST(request) {
  try {
    const { date, height, weight } = await request.json();
    
    if (!date || !height || !weight) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const stmt = db.prepare(
      'INSERT INTO growth_records (date, height, weight, createdAt) VALUES (?, ?, ?, ?)'
    );
    
    const newRecord = {
      date,
      height: parseFloat(height),
      weight: parseFloat(weight),
      createdAt: new Date().toISOString()
    };

    const result = stmt.run(
      newRecord.date,
      newRecord.height,
      newRecord.weight,
      newRecord.createdAt
    );
    
    return NextResponse.json({ 
      success: true,
      record: newRecord
    });

  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: 'Database operation failed', details: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const stmt = db.prepare('SELECT * FROM growth_records ORDER BY date DESC');
    const records = stmt.all();
    
    return NextResponse.json({ records });
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch records', details: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');
    
    const stmt = db.prepare('DELETE FROM growth_records WHERE date = ? LIMIT 1');
    const result = stmt.run(date);
    
    return NextResponse.json({ 
      success: true,
      deletedDate: date 
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete record' },
      { status: 500 }
    );
  }
}