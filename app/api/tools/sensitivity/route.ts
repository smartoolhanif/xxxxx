import { NextRequest, NextResponse } from 'next/server';

// Sample sensitivity calculator endpoint
export async function GET(request: NextRequest) {
  try {
    // Get sensitivity parameters from the request
    const searchParams = request.nextUrl.searchParams;
    const oldSens = searchParams.get('oldSens');
    const oldDpi = searchParams.get('oldDpi');
    const newDpi = searchParams.get('newDpi');
    
    if (!oldSens || !oldDpi || !newDpi) {
      return NextResponse.json(
        {
          status: "error",
          message: "Missing required parameters: oldSens, oldDpi, newDpi",
          timestamp: new Date().toISOString(),
        },
        { status: 400 }
      );
    }
    
    // Convert parameters to numbers
    const oldSensValue = parseFloat(oldSens);
    const oldDpiValue = parseInt(oldDpi);
    const newDpiValue = parseInt(newDpi);
    
    // Calculate new sensitivity
    // Formula: newSens = oldSens * (oldDpi / newDpi)
    const newSensitivity = oldSensValue * (oldDpiValue / newDpiValue);
    
    // Return the result
    return NextResponse.json({
      status: "success",
      data: {
        oldSensitivity: oldSensValue,
        oldDpi: oldDpiValue,
        newDpi: newDpiValue,
        newSensitivity: Math.round(newSensitivity * 100) / 100, // Round to 2 decimal places
      },
      timestamp: new Date().toISOString(),
    });
    
  } catch (error) {
    console.error('Sensitivity calculator error:', error);
    return NextResponse.json(
      {
        status: "error",
        message: "An error occurred processing your request",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
} 