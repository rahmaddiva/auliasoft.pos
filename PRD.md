# PRD - AULIASOFT Promotional Website

## Ringkasan

AULIASOFT Promotional Website adalah landing page static single-page untuk mempromosikan AULIASOFT POS, aplikasi kasir berbasis web untuk koperasi, retail, warung, dan bisnis kuliner.

## Tujuan Bisnis

- Meningkatkan awareness produk AULIASOFT POS.
- Menjelaskan fitur, layanan, harga, proses onboarding, dan keunggulan produk.
- Mengarahkan calon pelanggan ke WhatsApp atau halaman order AULIASOFT.
- Meningkatkan kredibilitas melalui testimoni, data outlet, dan informasi kontak jelas.

## Target Pengguna

- Pengurus koperasi KKMP/KDMP.
- Pemilik toko retail, warung, dan bisnis kuliner.
- Pengambil keputusan yang membandingkan solusi POS.

## Scope Produk

Website ini bersifat static landing page tanpa backend, database, atau proses build.

### In Scope

- Hero section dengan CTA utama.
- About, services, features, showcase produk, comparison, roadmap, products, pricing, policies, FAQ, testimonials, contact, dan footer.
- Dark/light mode.
- Smooth scroll.
- Mobile drawer navigation.
- Scroll animation.
- Contact form redirect ke WhatsApp.
- SEO metadata, Open Graph, Twitter Card, sitemap, robots, dan JSON-LD.

### Out of Scope

- Backend contact form.
- Payment flow internal.
- CMS/admin panel.
- User authentication.
- Analytics dashboard.

## Requirements

### Functional Requirements

- Pengunjung dapat melihat informasi produk dan paket harga.
- Pengunjung dapat berpindah antar section via anchor navigation.
- Pengunjung dapat mengirim pesan dari form kontak ke WhatsApp AULIASOFT.
- Pengunjung dapat membuka halaman order eksternal sesuai paket harga.
- Pengunjung dapat mengganti theme dark/light, dan preferensi tersimpan di browser.
- Pengunjung mobile dapat menggunakan hamburger menu.
- FAQ dapat dibuka/tutup dengan accordion.

### Non-Functional Requirements

- Website harus responsive untuk desktop, tablet, dan mobile.
- Website harus tetap usable jika library animasi CDN gagal dimuat.
- Website harus menghormati `prefers-reduced-motion`.
- Asset tidak terpakai tidak boleh ikut dideploy.
- HTML/CSS/JS harus mudah dirawat tanpa build step.

## Success Metrics

- Lighthouse Performance target: 90+.
- Lighthouse SEO target: 95+.
- CTA click-through rate target: 5%+.
- Contact form interaction target: 2%+ dari visitor.
- Bounce rate target: di bawah 40%.

## Technical Notes

- Main HTML: `index.html`.
- Main CSS: `css/custom.css`.
- Main JS: `js/custom.js`.
- Active image assets berada di `img/`.
- Contact form menggunakan WhatsApp redirect, bukan backend submission.

## Future Enhancements

- Tambahkan analytics event tracking.
- Tambahkan WebP/AVIF responsive images.
- Tambahkan minification pipeline opsional.
- Tambahkan canonical production URL jika domain final berbeda dari `https://www.auliasoft.com/`.
- Tambahkan page speed audit otomatis.
