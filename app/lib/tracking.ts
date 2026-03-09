// =============================================================================
// FASE 3 & 4: Sistema de Tracking de Conversiones
// =============================================================================
// Flight Check (medición propia) + DataLayer Push (GTM/GA4)
// Cada conversión se registra en DOS sistemas independientes para verificación.
// =============================================================================

// --- Tipos de conversión ---
export type ConversionType = 'form_submit' | 'phone_click' | 'whatsapp_click' | 'qualified_lead';

export interface ConversionEvent {
  type: ConversionType;
  source: string;
  medium: string;
  campaign?: string;
  domain: string;
  timestamp: string;
  label?: string;
  page?: string;
}

// --- Utilidad: Leer parámetros UTM de la URL ---
export function getUTMParam(param: string): string | null {
  if (typeof window === 'undefined') return null;
  try {
    const url = new URL(window.location.href);
    return url.searchParams.get(param);
  } catch {
    return null;
  }
}

// --- Utilidad: Obtener datos UTM completos ---
export function getUTMData() {
  return {
    source: getUTMParam('utm_source') || 'direct',
    medium: getUTMParam('utm_medium') || 'none',
    campaign: getUTMParam('utm_campaign') || undefined,
  };
}

// --- FLIGHT CHECK: Envío al endpoint propio (Fase 4.1) ---
export async function trackConversion(event: ConversionEvent) {
  try {
    await fetch('/api/conversions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event),
    });
  } catch (e) {
    // Silencioso: no debe afectar la experiencia del usuario
    console.error('[Flight Check] Error:', e);
  }
}

// --- DATALAYER PUSH: Envío a GTM (Fase 3.2) ---
export function pushToDataLayer(event: string, params: Record<string, string>) {
  if (typeof window !== 'undefined') {
    (window as any).dataLayer?.push({
      event,
      ...params,
    });
  }
}

// --- Función combinada: Flight Check + DataLayer en una sola llamada ---
export function trackFullConversion(
  type: ConversionType,
  label: string,
  extraParams?: Record<string, string>
) {
  const utm = getUTMData();
  const domain = typeof window !== 'undefined' ? window.location.hostname : '';
  const page = typeof window !== 'undefined' ? window.location.pathname : '';

  // 1. DataLayer push para GTM (Fase 3)
  pushToDataLayer(type, {
    event_category: 'conversion',
    event_label: label,
    ...extraParams,
  });

  // 2. Flight Check - tracking propio (Fase 4)
  trackConversion({
    type,
    source: utm.source,
    medium: utm.medium,
    campaign: utm.campaign,
    domain,
    timestamp: new Date().toISOString(),
    label,
    page,
  });
}
