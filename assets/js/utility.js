var userMessage = $('.message-input').val();
const googleArea = new Set([
    "DZ", // Algeria
    "AS", // American Samoa
    "AO", // Angola
    "AI", // Anguilla
    "AQ", // Antarctica
    "AG", // Antigua and Barbuda
    "AR", // Argentina
    "AM", // Armenia
    "AW", // Aruba
    "AU", // Australia
    "AZ", // Azerbaijan
    "BS", // The Bahamas
    "BH", // Bahrain
    "BD", // Bangladesh
    "BB", // Barbados
    "BZ", // Belize
    "BJ", // Benin
    "BM", // Bermuda
    "BT", // Bhutan
    "BO", // Bolivia
    "BW", // Botswana
    "BR", // Brazil
    "IO", // British Indian Ocean Territory
    "VG", // British Virgin Islands
    "BN", // Brunei
    "BF", // Burkina Faso
    "BI", // Burundi
    "CV", // Cabo Verde
    "KH", // Cambodia
    "CM", // Cameroon
    "BQ", // Caribbean Netherlands
    "KY", // Cayman Islands
    "CF", // Central African Republic
    "TD", // Chad
    "CL", // Chile
    "CX", // Christmas Island
    "CC", // Cocos (Keeling) Islands
    "CO", // Colombia
    "KM", // Comoros
    "CK", // Cook Islands
    "CI", // Côte d'Ivoire
    "CR", // Costa Rica
    "CW", // Curaçao
    "CD", // Democratic Republic of the Congo
    "DJ", // Djibouti
    "DM", // Dominica
    "DO", // Dominican Republic
    "EC", // Ecuador
    "EG", // Egypt
    "SV", // El Salvador
    "GQ", // Equatorial Guinea
    "ER", // Eritrea
    "SZ", // Eswatini
    "ET", // Ethiopia
    "FK", // Falkland Islands (Islas Malvinas)
    "FJ", // Fiji
    "GA", // Gabon
    "GM", // The Gambia
    "GE", // Georgia
    "GH", // Ghana
    "GI", // Gibraltar
    "GD", // Grenada
    "GU", // Guam
    "GT", // Guatemala
    "GG", // Guernsey
    "GN", // Guinea
    "GW", // Guinea-Bissau
    "GY", // Guyana
    "HT", // Haiti
    "HM", // Heard Island and McDonald Islands
    "HN", // Honduras
    "IN", // India
    "ID", // Indonesia
    "IQ", // Iraq
    "IM", // Isle of Man
    "IL", // Israel
    "JM", // Jamaica
    "JP", // Japan
    "JE", // Jersey
    "JO", // Jordan
    "KZ", // Kazakhstan
    "KE", // Kenya
    "KI", // Kiribati
    "KG", // Kyrgyzstan
    "KW", // Kuwait
    "LA", // Laos
    "LB", // Lebanon
    "LS", // Lesotho
    "LR", // Liberia
    "LY", // Libya
    "MG", // Madagascar
    "MW", // Malawi
    "MY", // Malaysia
    "MV", // Maldives
    "ML", // Mali
    "MH", // Marshall Islands
    "MR", // Mauritania
    "MU", // Mauritius
    "MX", // Mexico
    "FM", // Micronesia
    "MN", // Mongolia
    "MS", // Montserrat
    "MA", // Morocco
    "MZ", // Mozambique
    "NA", // Namibia
    "NR", // Nauru
    "NP", // Nepal
    "NC", // New Caledonia
    "NZ", // New Zealand
    "NI", // Nicaragua
    "NE", // Niger
    "NG", // Nigeria
    "NU", // Niue
    "NF", // Norfolk Island
    "MP", // Northern Mariana Islands
    "OM", // Oman
    "PK", // Pakistan
    "PW", // Palau
    "PS", // Palestine
    "PA", // Panama
    "PG", // Papua New Guinea
    "PY", // Paraguay
    "PE", // Peru
    "PH", // Philippines
    "PN", // Pitcairn Islands
    "PR", // Puerto Rico
    "QA", // Qatar
    "CG", // Republic of the Congo
    "RW", // Rwanda
    "BL", // Saint Barthélemy
    "KN", // Saint Kitts and Nevis
    "LC", // Saint Lucia
    "PM", // Saint Pierre and Miquelon
    "VC", // Saint Vincent and the Grenadines
    "SH", // Saint Helena, Ascension and Tristan da Cunha
    "WS", // Samoa
    "ST", // São Tomé and Príncipe
    "SA", // Saudi Arabia
    "SN", // Senegal
    "SC", // Seychelles
    "SL", // Sierra Leone
    "SG", // Singapore
    "SB", // Solomon Islands
    "SO", // Somalia
    "ZA", // South Africa
    "GS", // South Georgia and the South Sandwich Islands
    "KR", // South Korea
    "SS", // South Sudan
    "LK", // Sri Lanka
    "SD", // Sudan
    "SR", // Suriname
    "TW", // Taiwan
    "TJ", // Tajikistan
    "TZ", // Tanzania
    "TH", // Thailand
    "TL", // Timor-Leste
    "TG", // Togo
    "TK", // Tokelau
    "TO", // Tonga
    "TT", // Trinidad and Tobago
    "TN", // Tunisia
    "TR", // Türkiye
    "TM", // Turkmenistan
    "TC", // Turks and Caicos Islands
    "TV", // Tuvalu
    "UG", // Uganda
    "AE", // United Arab Emirates
    "US", // United States
    "UM", // United States Minor Outlying Islands
    "VI", // U.S. Virgin Islands
    "UY", // Uruguay
    "UZ", // Uzbekistan
    "VU", // Vanuatu
    "VE", // Venezuela
    "VN", // Vietnam
    "WF", // Wallis and Futuna
    "EH", // Western Sahara
    "YE", // Yemen
    "ZM", // Zambia
    "ZW"  // Zimbabwe
]);


const openaiArea = new Set([
    "AL", // Albania
    "DZ", // Algeria
    "AF", // Afghanistan
    "AD", // Andorra
    "AO", // Angola
    "AG", // Antigua and Barbuda
    "AR", // Argentina
    "AM", // Armenia
    "AU", // Australia
    "AT", // Austria
    "AZ", // Azerbaijan
    "BS", // Bahamas
    "BH", // Bahrain
    "BD", // Bangladesh
    "BB", // Barbados
    "BE", // Belgium
    "BZ", // Belize
    "BJ", // Benin
    "BT", // Bhutan
    "BO", // Bolivia
    "BA", // Bosnia and Herzegovina
    "BW", // Botswana
    "BR", // Brazil
    "BN", // Brunei
    "BG", // Bulgaria
    "BF", // Burkina Faso
    "BI", // Burundi
    "CV", // Cabo Verde
    "KH", // Cambodia
    "CM", // Cameroon
    "CA", // Canada
    "CF", // Central African Republic
    "TD", // Chad
    "CL", // Chile
    "CO", // Colombia
    "KM", // Comoros
    "CG", // Congo (Brazzaville)
    "CD", // Congo (DRC)
    "CR", // Costa Rica
    "CI", // Côte d'Ivoire
    "HR", // Croatia
    "CY", // Cyprus
    "CZ", // Czechia (Czech Republic)
    "DK", // Denmark
    "DJ", // Djibouti
    "DM", // Dominica
    "DO", // Dominican Republic
    "EC", // Ecuador
    "EG", // Egypt
    "SV", // El Salvador
    "GQ", // Equatorial Guinea
    "ER", // Eritrea
    "EE", // Estonia
    "SZ", // Eswatini (Swaziland)
    "ET", // Ethiopia
    "FJ", // Fiji
    "FI", // Finland
    "FR", // France
    "GA", // Gabon
    "GM", // Gambia
    "GE", // Georgia
    "DE", // Germany
    "GH", // Ghana
    "GR", // Greece
    "GD", // Grenada
    "GT", // Guatemala
    "GN", // Guinea
    "GW", // Guinea-Bissau
    "GY", // Guyana
    "HT", // Haiti
    "VA", // Holy See (Vatican City)
    "HN", // Honduras
    "HU", // Hungary
    "IS", // Iceland
    "IN", // India
    "ID", // Indonesia
    "IQ", // Iraq
    "IE", // Ireland
    "IL", // Israel
    "IT", // Italy
    "JM", // Jamaica
    "JP", // Japan
    "JO", // Jordan
    "KZ", // Kazakhstan
    "KE", // Kenya
    "KI", // Kiribati
    "KW", // Kuwait
    "KG", // Kyrgyzstan
    "LA", // Laos
    "LV", // Latvia
    "LB", // Lebanon
    "LS", // Lesotho
    "LR", // Liberia
    "LY", // Libya
    "LI", // Liechtenstein
    "LT", // Lithuania
    "LU", // Luxembourg
    "MG", // Madagascar
    "MW", // Malawi
    "MY", // Malaysia
    "MV", // Maldives
    "ML", // Mali
    "MT", // Malta
    "MH", // Marshall Islands
    "MR", // Mauritania
    "MU", // Mauritius
    "MX", // Mexico
    "FM", // Micronesia
    "MD", // Moldova
    "MC", // Monaco
    "MN", // Mongolia
    "ME", // Montenegro
    "MA", // Morocco
    "MZ", // Mozambique
    "MM", // Myanmar
    "NA", // Namibia
    "NR", // Nauru
    "NP", // Nepal
    "NL", // Netherlands
    "NZ", // New Zealand
    "NI", // Nicaragua
    "NE", // Niger
    "NG", // Nigeria
    "MK", // North Macedonia
    "NO", // Norway
    "OM", // Oman
    "PK", // Pakistan
    "PW", // Palau
    "PS", // Palestine
    "PA", // Panama
    "PG", // Papua New Guinea
    "PY", // Paraguay
    "PE", // Peru
    "PH", // Philippines
    "PL", // Poland
    "PT", // Portugal
    "QA", // Qatar
    "RO", // Romania
    "RW", // Rwanda
    "KN", // Saint Kitts and Nevis
    "LC", // Saint Lucia
    "VC", // Saint Vincent and the Grenadines
    "WS", // Samoa
    "SM", // San Marino
    "ST", // Sao Tome and Principe
    "SA", // Saudi Arabia
    "SN", // Senegal
    "RS", // Serbia
    "SC", // Seychelles
    "SL", // Sierra Leone
    "SG", // Singapore
    "SK", // Slovakia
    "SI", // Slovenia
    "SB", // Solomon Islands
    "SO", // Somalia
    "ZA", // South Africa
    "KR", // South Korea
    "SS", // South Sudan
    "ES", // Spain
    "LK", // Sri Lanka
    "SR", // Suriname
    "SE", // Sweden
    "CH", // Switzerland
    "SD", // Sudan
    "TW", // Taiwan
    "TJ", // Tajikistan
    "TZ", // Tanzania
    "TH", // Thailand
    "TL", // Timor-Leste (East Timor)
    "TG", // Togo
    "TO", // Tonga
    "TT", // Trinidad and Tobago
    "TN", // Tunisia
    "TR", // Turkey
    "TM", // Turkmenistan
    "TV", // Tuvalu
    "UG", // Uganda
    "UA", // Ukraine (with certain exceptions)
    "AE", // United Arab Emirates
    "GB", // United Kingdom
    "US", // United States of America
    "UY", // Uruguay
    "UZ", // Uzbekistan
    "VU", // Vanuatu
    "VN", // Vietnam
    "YE", // Yemen
    "ZM", // Zambia
    "ZW"  // Zimbabwe
]);


var $messages = $('.messages-content'),
    d, h, m,
    i = 0;

$(window).load(function() {
  $messages.mCustomScrollbar();
  setTimeout(function() {
    startMessage();
  }, 100);
});

function updateScrollbar() {
  $messages.mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
    scrollInertia: 10,
    timeout: 0
  });
}

function setDate(){
  d = new Date()
  if (m != d.getMinutes()) {
    m = d.getMinutes();
    $('<div class="timestamp">' + d.getHours() + ':' + m + '</div>').appendTo($('.message:last'));
  }
}

function insertMessage() {
  userMessage = $('.message-input').val();
  if ($.trim(userMessage) == '') {
    return false;
  }
  $('<div class="message message-personal">' + userMessage + '</div>').appendTo($('.mCSB_container')).addClass('new');
  setDate();
  $('.message-input').val(null);
  updateScrollbar();
  setTimeout(function() {
    startMessage();
  }, 0.5);
}

function replaceNewlinesWithBR(text) {
    return text.replace(/\n/g, "<br>");
}