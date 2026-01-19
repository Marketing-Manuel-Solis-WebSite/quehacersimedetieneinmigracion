import { NextRequest, NextResponse } from 'next/server';

const EXTERNAL_API_URL = 'https://bos.manuelsolis.com/lead/manuelsolis';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        
        console.log("📥 [BACKEND] Body recibido:", body);

        const { 
            first_name, 
            last_name, 
            email, 
            phone, 
            enquiry_detail, 
            acceptedTerms,
            marketingConsent,
            uri,
            language,
            utm_source,
            utm_medium,
            utm_campaign
        } = body;

        // --- LÓGICA DE FUENTE (SOURCE) ---
        // 1. Usamos lo que viene (ej: "google").
        let finalSource = utm_source;

        // 2. Si llega vacío (Orgánico), le ponemos etiqueta "SITIO WEB".
        if (!finalSource || finalSource.trim() === '' || finalSource === 'null' || finalSource === 'undefined') {
            finalSource = 'SITIO WEB';
        }

        const finalMedium = (utm_medium && utm_medium.trim() !== '') ? utm_medium : 'Organico';
        const finalCampaign = (utm_campaign && utm_campaign.trim() !== '') ? utm_campaign : 'Directo';

        // --- LÓGICA DE PREGUNTA ---
        let finalDetail = enquiry_detail || '';
        if (finalSource !== 'SITIO WEB') {
             finalDetail = `${finalDetail} | Fuente: ${finalSource}`;
        }

        // --- PAYLOAD ---
        const payload = {
            name: first_name,       
            first_name: first_name,
            last_name: last_name,
            phone: phone,
            email: email,
            enquiry_detail: finalDetail, 
            
            acceptedTerms: acceptedTerms ? 1 : 0,      
            marketingConsent: marketingConsent ? 1 : 0,
            
            // Aquí pasamos la URI tal cual vino del frontend (Completa o Limpia según corresponda)
            uri: uri, 
            
            language_preference: language,
            
            source: finalSource,       
            utm_source: finalSource,   
            medium: finalMedium,
            utm_medium: finalMedium,
            campaign: finalCampaign
        };

        console.log("🚀 [BACKEND] Enviando Source:", finalSource);
        console.log("🔗 [BACKEND] Enviando URI:", uri);

        const response = await fetch(EXTERNAL_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(payload),
        });

        if (response.ok) {
            return NextResponse.json({ success: true });
        } else {
            const errorText = await response.text();
            console.error("❌ ERROR API:", errorText);
            return NextResponse.json({ success: false, error: 'External API error' }, { status: response.status });
        }
    } catch (error) {
        console.error('❌ ERROR SERVIDOR:', error);
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
    }
}