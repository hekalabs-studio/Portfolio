/**
 * ==============================================================================
 * Google Apps Script (GAS) - Alternatif Backend Formulir Kontak HekaLabs Portfolio
 * ==============================================================================
 * Jika Anda ingin menjalankan endpoint formulir 100% mandiri di ekosistem Google:
 * 1. Buka https://script.google.com/home dengan akun hekoding@gmail.com
 * 2. Klik "New project" / "Proyek Baru".
 * 3. Hapus kode bawaan, lalu paste seluruh isi file ini ke file `Code.gs`.
 * 4. Klik "Deploy" -> "New deployment".
 * 5. Pilih jenis "Web app":
 *    - Description: "HekaLabs Portfolio Contact API"
 *    - Execute as: "Me (hekoding@gmail.com)"
 *    - Who has access: "Anyone" (Siapa saja, termasuk anonim)
 * 6. Klik "Deploy" dan izinkan akses (Authorize Access).
 * 7. Salin Web App URL yang dihasilkan (mis. https://script.google.com/macros/s/.../exec).
 * 8. Ganti nilai `ENDPOINT` di file `js/script.js` dengan URL tersebut.
 * ==============================================================================
 */

function doPost(e) {
  try {
    var rawData = e.postData && e.postData.contents ? e.postData.contents : '{}';
    var data = JSON.parse(rawData);

    // 1. Anti-spam honeypot
    if (data.website_hp && String(data.website_hp).trim() !== '') {
      return createJsonResponse({ success: true, message: 'Pesan berhasil diterima.' });
    }

    // 2. Validasi input
    var name = (data.name || '').trim();
    var email = (data.email || '').trim();
    var category = (data.category || data.Kategori || 'Pesan Umum').trim();
    var whatsapp = (data.whatsapp || data.WhatsApp_Telegram || '').trim();
    var message = (data.message || '').trim();

    if (!name || name.length < 2) {
      return createJsonResponse({ success: false, error: 'Nama tidak valid.' }, 400);
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return createJsonResponse({ success: false, error: 'Format email tidak valid.' }, 400);
    }
    if (!message || message.length < 5) {
      return createJsonResponse({ success: false, error: 'Pesan minimal 5 karakter.' }, 400);
    }

    // 3. Waktu Jakarta (WIB)
    var waktuWib = Utilities.formatDate(new Date(), 'Asia/Jakarta', "EEEE, dd MMMM yyyy 'pukul' HH.mm.ss") + ' WIB';

    // 4. Format WhatsApp link
    var whatsappHtml = '<span style="color: #71717a;">(Tidak dicantumkan)</span>';
    if (whatsapp && whatsapp !== '(tidak diisi)') {
      var cleanDigits = whatsapp.replace(/\D/g, '');
      if (cleanDigits.indexOf('08') === 0) cleanDigits = '628' + cleanDigits.substring(2);
      whatsappHtml = '<a href="https://wa.me/' + cleanDigits + '" style="color: #5aa7ff; text-decoration: underline;" target="_blank">' + escapeHtml(whatsapp) + '</a>';
    }

    // 5. Lampiran opsional
    var attachments = [];
    var attachmentNotice = 'Tidak ada lampiran file.';
    if (data.fileBase64) {
      var matches = data.fileBase64.match(/^data:([a-zA-Z0-9+.-]+\/[a-zA-Z0-9+.-]+);base64,(.+)$/);
      if (matches) {
        var mimeType = matches[1];
        var base64Data = matches[2];
        var decodedBytes = Utilities.base64Decode(base64Data);
        var fileName = data.fileName || 'lampiran-' + new Date().getTime();
        var blob = Utilities.newBlob(decodedBytes, mimeType, fileName);
        attachments.push(blob);
        attachmentNotice = 'Lampiran file (' + fileName + ') terlampir pada email ini.';
      }
    }

    // 6. Template HTML Gelap (Aether - The New Frontier)
    var emailHtml = '<!DOCTYPE html><html lang="id"><head><meta charset="UTF-8"><style>' +
      'body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background-color: #09090b; color: #f4f4f5; margin: 0; padding: 24px; }' +
      '.container { max-width: 600px; margin: 0 auto; background: #18181b; border: 1px solid #27272a; border-radius: 8px; overflow: hidden; }' +
      '.header { background: #000000; padding: 24px; border-bottom: 2px solid #27272a; }' +
      '.header-tag { font-family: monospace; font-size: 11px; color: #a1a1aa; letter-spacing: 0.05em; text-transform: uppercase; }' +
      '.header-title { margin: 6px 0 0 0; font-size: 20px; font-weight: 700; color: #ffffff; }' +
      '.content { padding: 24px; }' +
      '.highlight-box { background: #27272a; border-radius: 6px; padding: 18px; margin-bottom: 20px; text-align: center; }' +
      '.highlight-label { font-size: 12px; font-family: monospace; color: #a1a1aa; margin-bottom: 4px; letter-spacing: 0.05em; text-transform: uppercase; }' +
      '.highlight-value { font-size: 24px; font-weight: 800; color: #ffffff; letter-spacing: -0.02em; }' +
      'table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }' +
      'td { padding: 10px 0; border-bottom: 1px solid #27272a; font-size: 14px; }' +
      'td.label { color: #a1a1aa; font-family: monospace; width: 35%; font-size: 12px; }' +
      'td.value { color: #ffffff; font-weight: 500; }' +
      '.message-box { background: #09090b; border: 1px solid #27272a; border-radius: 6px; padding: 14px; margin-top: 14px; }' +
      '.message-title { font-size: 11px; font-family: monospace; color: #a1a1aa; margin-bottom: 6px; letter-spacing: 0.05em; }' +
      '.message-text { font-size: 14px; color: #f4f4f5; font-style: italic; white-space: pre-wrap; line-height: 1.6; }' +
      '.meta-footer { background: #000000; padding: 16px 24px; font-size: 11px; font-family: monospace; color: #71717a; border-top: 1px solid #27272a; }' +
      '</style></head><body><div class="container">' +
      '<div class="header">' +
      '<div class="header-tag">HEKALABS // NOTIFIKASI FORMULIR PORTOFOLIO</div>' +
      '<h1 class="header-title">Pesan Portofolio Masuk</h1>' +
      '</div>' +
      '<div class="content">' +
      '<div class="highlight-box">' +
      '<div class="highlight-label">KATEGORI PESAN</div>' +
      '<div class="highlight-value">' + escapeHtml(category) + '</div>' +
      '</div>' +
      '<table>' +
      '<tr><td class="label">NAMA PENGIRIM</td><td class="value">' + escapeHtml(name) + '</td></tr>' +
      '<tr><td class="label">EMAIL PENGIRIM</td><td class="value"><a href="mailto:' + escapeHtml(email) + '" style="color: #5aa7ff; text-decoration: underline;">' + escapeHtml(email) + '</a></td></tr>' +
      '<tr><td class="label">WHATSAPP / TELEGRAM</td><td class="value">' + whatsappHtml + '</td></tr>' +
      '<tr><td class="label">STATUS RESPON</td><td class="value"><span style="color: #22c55e; font-weight: 600;">● Menunggu Balasan</span></td></tr>' +
      '<tr><td class="label">WAKTU (WIB)</td><td class="value">' + waktuWib + '</td></tr>' +
      '<tr><td class="label">SUMBER FORMULIR</td><td class="value">Novemas Heka Portfolio (hekaportfolio.web.app)</td></tr>' +
      '</table>' +
      '<div class="message-box">' +
      '<div class="message-title">ISI PESAN / KEBUTUHAN:</div>' +
      '<div class="message-text">"' + escapeHtml(message) + '"</div>' +
      '</div></div>' +
      '<div class="meta-footer">' +
      '<div>DISERAHKAN OLEH: Google Apps Script Webhook</div>' +
      '<div style="margin-top: 6px; color: #52525b;">' + attachmentNotice + '</div>' +
      '</div></div></body></html>';

    // 7. Kirim email via GmailApp
    var mailOptions = {
      name: 'HekaLabs Portfolio',
      htmlBody: emailHtml,
      replyTo: email,
      attachments: attachments
    };

    GmailApp.sendEmail(
      'hekoding@gmail.com',
      '[HekaLabs Portfolio] ' + category + ' dari ' + name,
      'Pesan baru dari ' + name + ' (' + email + '): ' + message,
      mailOptions
    );

    return createJsonResponse({
      success: true,
      message: 'Pesan berhasil dikirim ke hekoding@gmail.com!'
    });

  } catch (err) {
    return createJsonResponse({ success: false, error: err.toString() }, 500);
  }
}

function doOptions(e) {
  return createJsonResponse({ status: 'ok' });
}

function createJsonResponse(obj, statusCode) {
  var output = ContentService.createTextOutput(JSON.stringify(obj));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}

function escapeHtml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
