// Mapeo de slugs de oficinas a números de teléfono de emergencia
export const officesPhoneMap: Record<string, string> = {
  'houston-principal': '(713) 701-1731',
  'houston-navigation': '(713) 277-7838',
  'main-st': '+1 713-842-9575',
  'north-loop': '+1 713-429-0237',
  'northchase': '+1 346-522-4848',
  'houston-bellaire': '+1 832-598-0914',
  'kirby': '(713) 903-7875',
  'dallas': '(214) 753-8315',
  'el-paso': '(915) 233-7127',
  'harlingen': '(956) 597-7090',
  'chicago': '(312) 477-0389',
  'losangeles': '(213) 784-1554',
  'arvada': '(720) 358-8973',
  'memphis': '(901) 557-8357',
  'airways': '+1 901-557-8357',
  'league-city': '(832) 598-3782',
};

// Número por defecto (global)
export const DEFAULT_PHONE = '1-888-676-1238';
export const DEFAULT_PHONE_LINK = 'tel:18886761238';