// =============================================================================
// FASE 4.1: Flight Check - API Endpoint para registro propio de conversiones
// =============================================================================
// Este endpoint recibe conversiones desde el frontend y las registra como
// fuente de verdad independiente de GA4/GTM (Double Check).
//
// Los datos se registran en los logs de Vercel para consulta y conciliación.
// Para persistencia a largo plazo, conectar a Supabase, PlanetScale, etc.
// =============================================================================

import { NextRequest, NextResponse } from 'next/server';

interface ConversionPayload {
  type: 'form_submit' | 'phone_click' | 'whatsapp_click' | 'qualified_lead';
  source: string;
  medium: string;
  campaign?: string;
  domain: string;
  timestamp: string;
  label?: string;
  page?: string;
}

// Validar que el tipo de conversión sea válido
const VALID_TYPES = ['form_submit', 'phone_click', 'whatsapp_click', 'qualified_lead'];

export async function POST(request: NextRequest) {
  try {
    const body: ConversionPayload = await request.json();

    // Validación básica
    if (!body.type || !VALID_TYPES.includes(body.type)) {
      return NextResponse.json(
        { success: false, error: 'Invalid conversion type' },
        { status: 400 }
      );
    }

    if (!body.domain || !body.timestamp) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: domain, timestamp' },
        { status: 400 }
      );
    }

    // Registrar la conversión (Vercel captura estos logs automáticamente)
    console.log(JSON.stringify({
      _tag: 'FLIGHT_CHECK',
      type: body.type,
      source: body.source || 'direct',
      medium: body.medium || 'none',
      campaign: body.campaign || '',
      domain: body.domain,
      timestamp: body.timestamp,
      label: body.label || '',
      page: body.page || '',
    }));

    // TODO: Para persistencia, conectar aquí a tu base de datos:
    // await supabase.from('conversions').insert(body);
    // await db.insert(conversionsTable).values(body);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Flight Check API] Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
