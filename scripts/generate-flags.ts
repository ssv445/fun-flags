/**
 * Generate flags.json from REST Countries API
 * Run with: pnpm generate:flags
 */

import * as fs from "fs";
import * as path from "path";

interface RestCountry {
  cca2: string;
  name: {
    common: string;
    official: string;
  };
  capital?: string[];
  continents: string[];
  population: number;
  area: number;
  languages?: Record<string, string>;
  flags: {
    png: string;
    svg: string;
  };
}

interface Flag {
  code: string;
  name: string;
  continent: string;
  capital: string;
  colors: string[];
  colorCount: number;
  population?: number;
  area?: number;
  languages?: string[];
}

// Predefined colors for each country flag (curated list)
// These are the primary colors that appear in each flag
const FLAG_COLORS: Record<string, string[]> = {
  // A
  AD: ["#0018A8", "#FEDF00", "#D52B1E"], // Andorra
  AE: ["#00732F", "#FFFFFF", "#FF0000", "#000000"], // UAE
  AF: ["#000000", "#D32011", "#007A36", "#FFFFFF"], // Afghanistan
  AG: ["#000000", "#FCD116", "#CE1126", "#0072C6", "#FFFFFF"], // Antigua
  AI: ["#012169", "#FFFFFF", "#C8102E"], // Anguilla
  AL: ["#E41E20", "#000000"], // Albania
  AM: ["#D90012", "#0033A0", "#F2A800"], // Armenia
  AO: ["#CC092F", "#000000", "#FFCC00"], // Angola
  AR: ["#74ACDF", "#FFFFFF", "#FCBF49"], // Argentina
  AS: ["#002B7F", "#FFFFFF", "#BF0A30"], // American Samoa
  AT: ["#ED2939", "#FFFFFF"], // Austria
  AU: ["#012169", "#FFFFFF", "#E4002B"], // Australia
  AW: ["#4189DD", "#F9E814", "#FFFFFF", "#ED2939"], // Aruba
  AX: ["#0053A5", "#FECC00", "#DA291C"], // Aland Islands
  AZ: ["#0092BC", "#E4002B", "#00AF66", "#FFFFFF"], // Azerbaijan

  // B
  BA: ["#002395", "#FECB00", "#FFFFFF"], // Bosnia
  BB: ["#00267F", "#FFC726", "#000000"], // Barbados
  BD: ["#006A4E", "#F42A41"], // Bangladesh
  BE: ["#000000", "#FAE042", "#ED2939"], // Belgium
  BF: ["#009E49", "#EF2B2D", "#FCD116"], // Burkina Faso
  BG: ["#FFFFFF", "#00966E", "#D62612"], // Bulgaria
  BH: ["#FFFFFF", "#CE1126"], // Bahrain
  BI: ["#CE1126", "#1EB53A", "#FFFFFF"], // Burundi
  BJ: ["#008751", "#FCD116", "#E8112D"], // Benin
  BL: ["#002395", "#FFFFFF", "#ED2939"], // Saint Barthelemy
  BM: ["#CF142B", "#FFFFFF", "#012169"], // Bermuda
  BN: ["#F7E017", "#FFFFFF", "#000000", "#CF1020"], // Brunei
  BO: ["#D52B1E", "#F9E300", "#007934"], // Bolivia
  BR: ["#009C3B", "#FFDF00", "#002776", "#FFFFFF"], // Brazil
  BS: ["#00ABC9", "#FFC72C", "#000000"], // Bahamas
  BT: ["#FF4E12", "#FFD520", "#FFFFFF"], // Bhutan
  BW: ["#75AADB", "#FFFFFF", "#000000"], // Botswana
  BY: ["#C8313E", "#4AA657", "#FFFFFF"], // Belarus
  BZ: ["#003F87", "#CE1126", "#FFFFFF"], // Belize

  // C
  CA: ["#FF0000", "#FFFFFF"], // Canada
  CC: ["#008000", "#FFFF00", "#000000"], // Cocos Islands
  CD: ["#007FFF", "#F7D618", "#CE1021"], // DR Congo
  CF: ["#003082", "#FFFFFF", "#289728", "#FFCE00", "#D21034"], // Central African Rep
  CG: ["#009543", "#FBDE4A", "#DC241F"], // Congo
  CH: ["#DA291C", "#FFFFFF"], // Switzerland
  CI: ["#F77F00", "#FFFFFF", "#009E60"], // Ivory Coast
  CK: ["#012169", "#FFFFFF", "#C8102E"], // Cook Islands
  CL: ["#0039A6", "#FFFFFF", "#D52B1E"], // Chile
  CM: ["#007A5E", "#CE1126", "#FCD116"], // Cameroon
  CN: ["#DE2910", "#FFDE00"], // China
  CO: ["#FCD116", "#003893", "#CE1126"], // Colombia
  CR: ["#002B7F", "#FFFFFF", "#CE1126"], // Costa Rica
  CU: ["#002A8F", "#FFFFFF", "#CB1515"], // Cuba
  CV: ["#003893", "#FFFFFF", "#CF2027", "#F7D116"], // Cape Verde
  CW: ["#002B7F", "#F9E814", "#FFFFFF"], // Curacao
  CX: ["#0021AD", "#1C8A42", "#FFFFFF", "#F9D616"], // Christmas Island
  CY: ["#FFFFFF", "#D47600", "#4E5B31"], // Cyprus
  CZ: ["#D7141A", "#FFFFFF", "#11457E"], // Czechia

  // D
  DE: ["#000000", "#DD0000", "#FFCE00"], // Germany
  DJ: ["#6AB2E7", "#12AD2B", "#FFFFFF", "#D7141A"], // Djibouti
  DK: ["#C60C30", "#FFFFFF"], // Denmark
  DM: ["#006B3F", "#FCD116", "#FFFFFF", "#000000", "#D41C30", "#9461C9"], // Dominica
  DO: ["#002D62", "#CE1126", "#FFFFFF"], // Dominican Republic
  DZ: ["#006233", "#FFFFFF", "#D21034"], // Algeria

  // E
  EC: ["#FFE100", "#0033A0", "#CE1126"], // Ecuador
  EE: ["#0072CE", "#000000", "#FFFFFF"], // Estonia
  EG: ["#CE1126", "#FFFFFF", "#000000", "#C09300"], // Egypt
  EH: ["#000000", "#FFFFFF", "#007A3D", "#C4111B"], // Western Sahara
  ER: ["#4189DD", "#EA0437", "#12AD2B", "#FFC72C"], // Eritrea
  ES: ["#C60B1E", "#FFC400"], // Spain
  ET: ["#078930", "#FCDD09", "#DA121A", "#0F47AF"], // Ethiopia

  // F
  FI: ["#FFFFFF", "#003580"], // Finland
  FJ: ["#68BFE5", "#FFFFFF", "#002868", "#CF1628"], // Fiji
  FK: ["#002395", "#FFFFFF"], // Falkland Islands
  FM: ["#6797D6", "#FFFFFF"], // Micronesia
  FO: ["#FFFFFF", "#005EB8", "#EF303E"], // Faroe Islands
  FR: ["#002395", "#FFFFFF", "#ED2939"], // France

  // G
  GA: ["#009E60", "#FCD116", "#3A75C4"], // Gabon
  GB: ["#012169", "#FFFFFF", "#C8102E"], // UK
  GD: ["#CE1126", "#FCD116", "#007A5E"], // Grenada
  GE: ["#FFFFFF", "#FF0000"], // Georgia
  GF: ["#002395", "#FFFFFF", "#ED2939"], // French Guiana
  GG: ["#FFFFFF", "#E8112D", "#F9DD16"], // Guernsey
  GH: ["#EF2929", "#FCD116", "#006B3F", "#000000"], // Ghana
  GI: ["#FFFFFF", "#DA000C"], // Gibraltar
  GL: ["#FFFFFF", "#D00C33"], // Greenland
  GM: ["#3A7728", "#FFFFFF", "#CE1126", "#0C1C8C"], // Gambia
  GN: ["#CE1126", "#FCD116", "#009460"], // Guinea
  GP: ["#002395", "#FFFFFF", "#ED2939"], // Guadeloupe
  GQ: ["#3E9A00", "#FFFFFF", "#E32118", "#0073CE"], // Equatorial Guinea
  GR: ["#0D5EAF", "#FFFFFF"], // Greece
  GT: ["#4997D0", "#FFFFFF"], // Guatemala
  GU: ["#002387", "#CE2029", "#FFFFFF"], // Guam
  GW: ["#CE1126", "#FCD116", "#009E49", "#000000"], // Guinea-Bissau
  GY: ["#009E49", "#FFFFFF", "#FCD116", "#CE1126", "#000000"], // Guyana

  // H
  HK: ["#DE2910", "#FFFFFF"], // Hong Kong
  HN: ["#0073CF", "#FFFFFF"], // Honduras
  HR: ["#FF0000", "#FFFFFF", "#171796"], // Croatia
  HT: ["#00209F", "#D21034", "#FFFFFF"], // Haiti
  HU: ["#CD2A3E", "#FFFFFF", "#436F4D"], // Hungary

  // I
  ID: ["#FF0000", "#FFFFFF"], // Indonesia
  IE: ["#169B62", "#FFFFFF", "#FF883E"], // Ireland
  IL: ["#FFFFFF", "#0038B8"], // Israel
  IM: ["#CF142B", "#FFFFFF"], // Isle of Man
  IN: ["#FF9933", "#FFFFFF", "#138808", "#000080"], // India
  IO: ["#002395", "#FFFFFF"], // British Indian Ocean
  IQ: ["#CE1126", "#FFFFFF", "#007A3D", "#000000"], // Iraq
  IR: ["#239F40", "#FFFFFF", "#DA0000"], // Iran
  IS: ["#02529C", "#FFFFFF", "#DC1E35"], // Iceland
  IT: ["#009246", "#FFFFFF", "#CE2B37"], // Italy

  // J
  JE: ["#FFFFFF", "#DF112D", "#F9DD16"], // Jersey
  JM: ["#009B3A", "#FED100", "#000000"], // Jamaica
  JO: ["#000000", "#FFFFFF", "#007A3D", "#CE1126"], // Jordan
  JP: ["#FFFFFF", "#BC002D"], // Japan

  // K
  KE: ["#000000", "#BB0000", "#006600", "#FFFFFF"], // Kenya
  KG: ["#E8112D", "#FFEF00"], // Kyrgyzstan
  KH: ["#032EA1", "#E00025", "#FFFFFF"], // Cambodia
  KI: ["#CE1126", "#002B7F", "#FCD116", "#FFFFFF"], // Kiribati
  KM: ["#3A8E40", "#FFFFFF", "#FFC61E", "#CE1126", "#3D5897"], // Comoros
  KN: ["#009E49", "#FCD116", "#CE1126", "#000000", "#FFFFFF"], // Saint Kitts
  KP: ["#024FA2", "#FFFFFF", "#ED1C27"], // North Korea
  KR: ["#FFFFFF", "#CD2E3A", "#0047A0", "#000000"], // South Korea
  KW: ["#007A3D", "#FFFFFF", "#CE1126", "#000000"], // Kuwait
  KY: ["#002395", "#FFFFFF", "#CF142B"], // Cayman Islands
  KZ: ["#00AFCA", "#FEC50C"], // Kazakhstan

  // L
  LA: ["#CE1126", "#002868", "#FFFFFF"], // Laos
  LB: ["#ED1C24", "#FFFFFF", "#00A651"], // Lebanon
  LC: ["#65CFFF", "#FCD116", "#000000", "#FFFFFF"], // Saint Lucia
  LI: ["#002B7F", "#CE1126", "#FFD83D"], // Liechtenstein
  LK: ["#8D153A", "#FFB700", "#EB7400", "#005641"], // Sri Lanka
  LR: ["#BF0A30", "#002868", "#FFFFFF"], // Liberia
  LS: ["#00209F", "#FFFFFF", "#009543", "#000000"], // Lesotho
  LT: ["#FDB913", "#006A44", "#C1272D"], // Lithuania
  LU: ["#00A2E1", "#ED2939", "#FFFFFF"], // Luxembourg
  LV: ["#9E3039", "#FFFFFF"], // Latvia
  LY: ["#000000", "#239E46", "#E70013"], // Libya

  // M
  MA: ["#C1272D", "#006233"], // Morocco
  MC: ["#CE1126", "#FFFFFF"], // Monaco
  MD: ["#0046AE", "#FFD200", "#CC092F"], // Moldova
  ME: ["#C40308", "#D4AF37"], // Montenegro
  MF: ["#002395", "#FFFFFF", "#ED2939"], // Saint Martin
  MG: ["#FFFFFF", "#007E3A", "#FC3D32"], // Madagascar
  MH: ["#003893", "#FFFFFF", "#DD7500"], // Marshall Islands
  MK: ["#D20000", "#FFE600"], // North Macedonia
  ML: ["#14B53A", "#FCD116", "#CE1126"], // Mali
  MM: ["#FECB00", "#34B233", "#EA2839", "#FFFFFF"], // Myanmar
  MN: ["#C4272F", "#015197", "#F9CF02"], // Mongolia
  MO: ["#00785E", "#FFFFFF"], // Macau
  MP: ["#0071BC", "#FFFFFF"], // Northern Mariana Islands
  MQ: ["#002395", "#FFFFFF", "#ED2939"], // Martinique
  MR: ["#006233", "#FFD700", "#C1272D"], // Mauritania
  MS: ["#002395", "#FFFFFF", "#C8102E"], // Montserrat
  MT: ["#FFFFFF", "#CF142B"], // Malta
  MU: ["#00A551", "#FFD500", "#EA2839", "#131A6D"], // Mauritius
  MV: ["#D21034", "#007E3A", "#FFFFFF"], // Maldives
  MW: ["#000000", "#CE1126", "#339E35"], // Malawi
  MX: ["#006341", "#FFFFFF", "#CE1126"], // Mexico
  MY: ["#CC0001", "#FFFFFF", "#010066", "#FFCC00"], // Malaysia
  MZ: ["#009A44", "#000000", "#FCE100", "#D21034", "#FFFFFF"], // Mozambique

  // N
  NA: ["#003580", "#D21034", "#009A44", "#FFFFFF", "#FFE700"], // Namibia
  NC: ["#002395", "#FFFFFF", "#ED2939"], // New Caledonia
  NE: ["#E05206", "#FFFFFF", "#0DB02B"], // Niger
  NF: ["#00A651", "#FFFFFF"], // Norfolk Island
  NG: ["#008751", "#FFFFFF"], // Nigeria
  NI: ["#0067C6", "#FFFFFF"], // Nicaragua
  NL: ["#AE1C28", "#FFFFFF", "#21468B"], // Netherlands
  NO: ["#EF2B2D", "#FFFFFF", "#002868"], // Norway
  NP: ["#DC143C", "#003893", "#FFFFFF"], // Nepal
  NR: ["#012A6B", "#FFC61E", "#FFFFFF"], // Nauru
  NU: ["#FFC72C", "#012169", "#FFFFFF"], // Niue
  NZ: ["#012169", "#FFFFFF", "#C8102E"], // New Zealand

  // O
  OM: ["#DB161B", "#FFFFFF", "#008000"], // Oman

  // P
  PA: ["#FFFFFF", "#DA121A", "#072357"], // Panama
  PE: ["#D91023", "#FFFFFF"], // Peru
  PF: ["#FFFFFF", "#ED2939", "#002395"], // French Polynesia
  PG: ["#000000", "#CE1126", "#FCD116", "#FFFFFF"], // Papua New Guinea
  PH: ["#0038A8", "#CE1126", "#FCD116", "#FFFFFF"], // Philippines
  PK: ["#01411C", "#FFFFFF"], // Pakistan
  PL: ["#FFFFFF", "#DC143C"], // Poland
  PM: ["#002395", "#FFFFFF", "#ED2939"], // Saint Pierre
  PN: ["#012169", "#FFFFFF"], // Pitcairn Islands
  PR: ["#CC0000", "#FFFFFF", "#0050F0"], // Puerto Rico
  PS: ["#000000", "#FFFFFF", "#007A3D", "#CE1126"], // Palestine
  PT: ["#006600", "#FF0000", "#FFFF00", "#FFFFFF"], // Portugal
  PW: ["#4AADD6", "#FFDE00"], // Palau
  PY: ["#D52B1E", "#FFFFFF", "#0038A8"], // Paraguay

  // Q
  QA: ["#8D1B3D", "#FFFFFF"], // Qatar

  // R
  RE: ["#002395", "#FFFFFF", "#ED2939"], // Reunion
  RO: ["#002B7F", "#FCD116", "#CE1126"], // Romania
  RS: ["#C6363C", "#0C4076", "#FFFFFF", "#EEAD2D"], // Serbia
  RU: ["#FFFFFF", "#0039A6", "#D52B1E"], // Russia
  RW: ["#20603D", "#FAD201", "#00A1DE"], // Rwanda

  // S
  SA: ["#006C35", "#FFFFFF"], // Saudi Arabia
  SB: ["#0051BA", "#FCD116", "#215B33", "#FFFFFF"], // Solomon Islands
  SC: ["#003F87", "#FCD856", "#D62828", "#FFFFFF", "#007A3D"], // Seychelles
  SD: ["#D21034", "#FFFFFF", "#007229", "#000000"], // Sudan
  SE: ["#006AA7", "#FECC02"], // Sweden
  SG: ["#ED2939", "#FFFFFF"], // Singapore
  SH: ["#012169", "#FFFFFF"], // Saint Helena
  SI: ["#FFFFFF", "#005DA4", "#ED1C24"], // Slovenia
  SJ: ["#EF2B2D", "#FFFFFF", "#002868"], // Svalbard
  SK: ["#FFFFFF", "#0B4EA2", "#EE1C25"], // Slovakia
  SL: ["#1EB53A", "#FFFFFF", "#0072C6"], // Sierra Leone
  SM: ["#FFFFFF", "#5EB6E4"], // San Marino
  SN: ["#00853F", "#FDEF42", "#E31B23"], // Senegal
  SO: ["#4189DD", "#FFFFFF"], // Somalia
  SR: ["#377E3F", "#FFFFFF", "#B40A2D", "#ECC81D"], // Suriname
  SS: ["#000000", "#DA121A", "#078930", "#FFFFFF", "#0F47AF", "#FCDD09"], // South Sudan
  ST: ["#12AD2B", "#FFCE00", "#D21034", "#000000"], // Sao Tome
  SV: ["#0F47AF", "#FFFFFF"], // El Salvador
  SX: ["#002395", "#FFFFFF", "#ED2939"], // Sint Maarten
  SY: ["#CE1126", "#FFFFFF", "#000000", "#007A3D"], // Syria
  SZ: ["#3E5EB9", "#FFD900", "#CE1126", "#000000", "#FFFFFF"], // Eswatini

  // T
  TC: ["#012169", "#FFFFFF"], // Turks and Caicos
  TD: ["#002664", "#FECB00", "#C60C30"], // Chad
  TF: ["#002395", "#FFFFFF", "#ED2939"], // French Southern
  TG: ["#006A4E", "#FFCE00", "#D21034", "#FFFFFF"], // Togo
  TH: ["#A51931", "#F4F5F8", "#2D2A4A"], // Thailand
  TJ: ["#CC0000", "#FFFFFF", "#006600", "#F8C300"], // Tajikistan
  TK: ["#003893", "#FFCC00", "#FFFFFF"], // Tokelau
  TL: ["#DC241F", "#000000", "#FFCE00", "#FFFFFF"], // Timor-Leste
  TM: ["#28AE66", "#FFFFFF", "#D22630"], // Turkmenistan
  TN: ["#E70013", "#FFFFFF"], // Tunisia
  TO: ["#C10000", "#FFFFFF"], // Tonga
  TR: ["#E30A17", "#FFFFFF"], // Turkey
  TT: ["#CE1126", "#FFFFFF", "#000000"], // Trinidad
  TV: ["#00247D", "#FFCE00", "#FFFFFF"], // Tuvalu
  TW: ["#FE0000", "#000095", "#FFFFFF"], // Taiwan
  TZ: ["#00A3DD", "#FCD116", "#1EB53A", "#000000"], // Tanzania

  // U
  UA: ["#005BBB", "#FFD500"], // Ukraine
  UG: ["#000000", "#FCDC04", "#D90000", "#FFFFFF"], // Uganda
  US: ["#B31942", "#FFFFFF", "#0A3161"], // USA
  UY: ["#0038A8", "#FFFFFF", "#FCD116"], // Uruguay
  UZ: ["#0099B5", "#FFFFFF", "#1EB53A", "#CE1126"], // Uzbekistan

  // V
  VA: ["#FFE000", "#FFFFFF"], // Vatican
  VC: ["#0072C6", "#FCD116", "#009E60"], // Saint Vincent
  VE: ["#FCE300", "#003DA5", "#EF3340", "#FFFFFF"], // Venezuela
  VG: ["#012169", "#FFFFFF"], // British Virgin Islands
  VI: ["#FFFFFF", "#0050A0", "#FCE300"], // US Virgin Islands
  VN: ["#DA251D", "#FFFF00"], // Vietnam
  VU: ["#009543", "#D21034", "#FDCE12", "#000000"], // Vanuatu

  // W
  WF: ["#002395", "#FFFFFF", "#ED2939"], // Wallis and Futuna
  WS: ["#CE1126", "#002B7F", "#FFFFFF"], // Samoa

  // X (Kosovo)
  XK: ["#244AA5", "#D0A650", "#FFFFFF"], // Kosovo

  // Y
  YE: ["#CE1126", "#FFFFFF", "#000000"], // Yemen
  YT: ["#002395", "#FFFFFF", "#ED2939"], // Mayotte

  // Z
  ZA: ["#002395", "#DE3831", "#007A4D", "#FFB612", "#FFFFFF", "#000000"], // South Africa
  ZM: ["#198A00", "#DE2010", "#000000", "#EF7D00"], // Zambia
  ZW: ["#006400", "#FFD200", "#D40000", "#000000", "#FFFFFF"], // Zimbabwe
};

// Continent mapping for countries
const CONTINENT_MAP: Record<string, string> = {
  "Africa": "Africa",
  "Antarctica": "Antarctica",
  "Asia": "Asia",
  "Europe": "Europe",
  "North America": "North America",
  "Oceania": "Oceania",
  "South America": "South America",
};

async function fetchCountries(): Promise<RestCountry[]> {
  const response = await fetch("https://restcountries.com/v3.1/all?fields=cca2,name,capital,continents,population,area,languages,flags");
  if (!response.ok) {
    throw new Error(`Failed to fetch countries: ${response.statusText}`);
  }
  return response.json();
}

function normalizeContinent(continents: string[]): string {
  if (!continents || continents.length === 0) return "Unknown";
  const continent = continents[0];
  return CONTINENT_MAP[continent] || continent;
}

async function generateFlags(): Promise<void> {
  console.log("Fetching country data from REST Countries API...");
  const countries = await fetchCountries();
  console.log(`Fetched ${countries.length} countries`);

  const flags: Flag[] = countries
    .map((country): Flag | null => {
      const code = country.cca2;
      const colors = FLAG_COLORS[code] || [];

      if (!code) return null;

      return {
        code,
        name: country.name.common,
        continent: normalizeContinent(country.continents),
        capital: country.capital?.[0] || "N/A",
        colors,
        colorCount: colors.length,
        population: country.population,
        area: country.area,
        languages: country.languages ? Object.values(country.languages) : [],
      };
    })
    .filter((flag): flag is Flag => flag !== null)
    .sort((a, b) => a.name.localeCompare(b.name));

  console.log(`Generated ${flags.length} flags`);

  // Ensure data directory exists
  const dataDir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  // Write flags.json
  const outputPath = path.join(dataDir, "flags.json");
  fs.writeFileSync(outputPath, JSON.stringify(flags, null, 2));
  console.log(`Written to ${outputPath}`);

  // Generate statistics
  const continents = new Set(flags.map((f) => f.continent));
  const withColors = flags.filter((f) => f.colors.length > 0).length;
  const avgColors = flags.reduce((sum, f) => sum + f.colorCount, 0) / flags.length;

  console.log("\nStatistics:");
  console.log(`- Total flags: ${flags.length}`);
  console.log(`- Continents: ${continents.size} (${[...continents].join(", ")})`);
  console.log(`- Flags with color data: ${withColors}`);
  console.log(`- Average colors per flag: ${avgColors.toFixed(1)}`);
}

// Run the script
generateFlags().catch((error) => {
  console.error("Error generating flags:", error);
  process.exit(1);
});
