    const services = [
      { name: "Usajili wa Kampuni na Jina la Biashara", price: 50000, category: "biashara" },
      { name: "Kupata Leseni za Biashara", price: 40000, category: "biashara" },
      { name: "Maombi ya TIN (TRA)", price: 30000, category: "tra" },
      { name: "Maombi ya Vyeti vya Kuzaliwa na Vifo", price: 35000, category: "biashara" },
      { name: "Maombi ya Vibali vya Kazi (Work Permit)", price: 100000, category: "biashara" },
      { name: "Maombi ya Tenda za NEST", price: 75000, category: "biashara" },
      { name: "Ushuru na Forodha (Clearing & Forwarding)", price: 150000, category: "biashara" },
      { name: "Maombi ya Passport na Visa", price: 80000, category: "biashara" },
      { name: "Kutengeneza Profile ya Kampuni", price: 25000, category: "biashara" },
      { name: "Kutuma Faili TRA (File Returns)", price: 20000, category: "tra" },
      { name: "Ununuzi wa Viwanja vya Halmashauri", price: 60000, category: "biashara" },
      { name: "Loss Report", price: 15000, category: "biashara" },
      { name: "Web Design & Development", price: 250000, category: "it" },
      { name: "Bima", price: 30000, category: "biashara" },
      { name: "Kubadili Umiliki wa Chombo cha Moto", price: 30000, category: "tra" },
      { name: "Kubadili Taarifa za Chombo (Rangi, Chasis)", price: 30000, category: "tra" },
      { name: "Usajili Mpya wa Chombo cha Moto", price: 60000, category: "tra" },
      { name: "Kupata Duplicate ya Kadi ya Usajili", price: 20000, category: "tra" },
      { name: "Kufuta Chombo kilichoondolewa barabarani", price: 20000, category: "tra" },
      { name: "Kulipia Ada na Faini za Usajili", price: 15000, category: "tra" },
      { name: "Huduma Zingine Zote za IDRAS", price: 50000, category: "tra" }
    ];

    function renderServices() {
      const keyword = $('#searchInput').val().toLowerCase();
      const category = $('#categoryFilter').val();
      const maxPrice = parseInt($('#priceRange').val());

      $('#priceValue').text(`TSh 0 - TSh ${maxPrice.toLocaleString()}`);

      const filtered = services.filter(s =>
        s.name.toLowerCase().includes(keyword) &&
        (category === '' || s.category === category) &&
        s.price <= maxPrice
      );

      const cards = filtered.map(s => `
        <div class="col-md-6 col-lg-4 mb-4">
          <div class="card service-card h-100">
            <div class="card-body d-flex flex-column">
              <div class="d-flex align-items-center mb-3">
                <span class="material-symbols-outlined">work</span>
                <div>
                  <h6 class="card-title mb-0">${s.name}</h6>
                </div>
              </div>
              <p class="mb-1">Bei: <strong>TSh ${s.price.toLocaleString()}</strong></p>
            </div>
          </div>
        </div>
      `);

      $('#servicesContainer').html(cards.join(''));

      $('#totalServices').text(services.length);
      $('#minPrice').text(`TSh ${Math.min(...services.map(s => s.price)).toLocaleString()}`);
      $('#maxPrice').text(`TSh ${Math.max(...services.map(s => s.price)).toLocaleString()}`);
    }

    $('#searchInput, #categoryFilter, #priceRange').on('input change', renderServices);
    $(document).ready(() => {
      renderServices();

      $('#exportPdf').click(() => {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        let y = 10;
        services.forEach(s => {
          doc.text(`${s.name} - TSh ${s.price.toLocaleString()}`, 10, y);
          y += 10;
        });
        doc.save("huduma-davileen.pdf");
      });
    });
