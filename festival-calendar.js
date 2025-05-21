// Festival Calendar JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function() {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // View toggle
  const listViewBtn = document.getElementById('listViewBtn');
  const calendarViewBtn = document.getElementById('calendarViewBtn');
  const listView = document.getElementById('listView');
  const calendarView = document.getElementById('calendarView');
  
  listViewBtn.addEventListener('click', function() {
    listView.classList.remove('hidden');
    calendarView.classList.add('hidden');
    listViewBtn.classList.remove('border', 'text-pink-500');
    listViewBtn.classList.add('bg-pink-500', 'text-white');
    calendarViewBtn.classList.add('border', 'text-pink-500');
    calendarViewBtn.classList.remove('bg-pink-500', 'text-white');
  });
  
  calendarViewBtn.addEventListener('click', function() {
    calendarView.classList.remove('hidden');
    listView.classList.add('hidden');
    calendarViewBtn.classList.remove('border', 'text-pink-500');
    calendarViewBtn.classList.add('bg-pink-500', 'text-white');
    listViewBtn.classList.add('border', 'text-pink-500');
    listViewBtn.classList.remove('bg-pink-500', 'text-white');
  });

  // Modal functionality
  const festivalModal = document.getElementById('festivalModal');
  const closeModal = document.getElementById('closeModal');
  const festivalModalContent = document.getElementById('festivalModalContent');
  
  // Close modal when close button is clicked
  if (closeModal) {
    closeModal.addEventListener('click', function() {
      festivalModal.classList.add('hidden');
    });
  }
  
  // Close modal when clicking outside
  window.addEventListener('click', function(event) {
    if (event.target === festivalModal) {
      festivalModal.classList.add('hidden');
    }
  });

  // Festival data - comprehensive list of Indian festivals with dates for 2025
  const festivals = [
    {
      id: 'makar-sankranti',
      name: 'Makar Sankranti',
      date: new Date(2025, 0, 14), // January 14, 2025
      region: ['north', 'south', 'east', 'west'],
      category: 'harvest',
      description: 'A harvest festival celebrating the sun\'s transit into Capricorn, marked by flying kites and preparing special sweets.',
      traditional_attire: 'Women wear colorful sarees, while men dress in kurta-pajama or dhoti.',
      locations: 'Celebrated throughout India with regional variations.',
      ritual: 'Taking holy dips in rivers, flying kites, preparing til (sesame) sweets, and offering prayers to the Sun God.',
      color: 'yellow'
    },
    {
      id: 'pongal',
      name: 'Pongal',
      date: new Date(2025, 0, 14), // January 14-17, 2025 (Using start date)
      region: ['south'],
      category: 'harvest',
      description: 'A four-day harvest festival in South India, giving thanks to the Sun God for agricultural abundance.',
      traditional_attire: 'Women wear silk sarees, while men wear dhoti and shirts.',
      locations: 'Tamil Nadu, Andhra Pradesh, and parts of Karnataka.',
      ritual: 'Boiling freshly harvested rice with milk and jaggery, decorating cattle, and preparing special feasts.',
      color: 'yellow'
    },
    {
      id: 'republic-day',
      name: 'Republic Day',
      date: new Date(2025, 0, 26), // January 26, 2025
      region: ['north', 'south', 'east', 'west', 'northeast'],
      category: 'national',
      description: 'National holiday celebrating the adoption of the Indian Constitution.',
      traditional_attire: 'Many wear traditional attire representing their state or region.',
      locations: 'Throughout India with the main parade in New Delhi.',
      ritual: 'Flag hoisting, parades, cultural performances, and patriotic celebrations.',
      color: 'green'
    },
    {
      id: 'basant-panchami',
      name: 'Basant Panchami',
      date: new Date(2025, 1, 3), // February 3, 2025
      region: ['north', 'east'],
      category: 'religious',
      description: 'Festival marking the arrival of spring and worshipping Goddess Saraswati.',
      traditional_attire: 'Yellow-colored clothes are traditionally worn.',
      locations: 'North and East India, particularly in educational institutions.',
      ritual: 'Worshipping Goddess Saraswati, wearing yellow clothes, flying kites, and eating yellow-colored sweets.',
      color: 'purple'
    },
    {
      id: 'maha-shivratri',
      name: 'Maha Shivratri',
      date: new Date(2025, 1, 28), // February 28, 2025
      region: ['north', 'south', 'east', 'west', 'northeast'],
      category: 'religious',
      description: 'Great night of Lord Shiva, celebrated with night-long vigils and prayers.',
      traditional_attire: 'Men wear dhoti-kurta, women dress in sarees or salwar kameez, often in white or light colors.',
      locations: 'Throughout India, especially at Shiva temples.',
      ritual: 'Fasting, offering bel leaves to Shivalinga, night-long prayers, and meditation.',
      color: 'purple'
    },
    {
      id: 'holi',
      name: 'Holi',
      date: new Date(2025, 2, 15), // March 15, 2025
      region: ['north', 'east', 'west'],
      category: 'cultural',
      description: 'The festival of colors celebrating the arrival of spring and the triumph of good over evil.',
      traditional_attire: 'White clothes that become colored during celebrations.',
      locations: 'Most popular in North India, especially in Mathura, Vrindavan, and Barsana.',
      ritual: 'Playing with colors, water guns, gathering for community celebrations, and consuming special foods and drinks like thandai.',
      color: 'purple'
    },
    {
      id: 'ugadi',
      name: 'Ugadi',
      date: new Date(2025, 2, 31), // March 31, 2025
      region: ['south'],
      category: 'religious',
      description: 'Telugu and Kannada New Year, marking the beginning of a new Hindu lunar calendar.',
      traditional_attire: 'Traditional silk sarees for women and kurta-pyjama or dhoti for men.',
      locations: 'Andhra Pradesh, Telangana, and Karnataka.',
      ritual: 'House cleaning, decorating with mango leaves, preparing special dishes, and consuming "Ugadi pachadi" with six different flavors.',
      color: 'purple'
    },
    {
      id: 'gudi-padwa',
      name: 'Gudi Padwa',
      date: new Date(2025, 2, 31), // March 31, 2025
      region: ['west'],
      category: 'religious',
      description: 'Maharashtrian New Year, symbolizing prosperity and auspicious beginnings.',
      traditional_attire: 'Women wear traditional Maharashtrian sarees, men wear kurta-pyjama or dhoti.',
      locations: 'Maharashtra and Goa.',
      ritual: 'Raising the gudi (bamboo stick with cloth, neem leaves, and garland), house cleaning, and preparing traditional dishes.',
      color: 'purple'
    },
    {
      id: 'baisakhi',
      name: 'Baisakhi',
      date: new Date(2025, 3, 14), // April 14, 2025
      region: ['north'],
      category: 'harvest',
      description: 'Harvest festival in Punjab and creation of the Khalsa Panth by Guru Gobind Singh.',
      traditional_attire: 'Men wear kurta-pajama with turban, women dress in bright salwar kameez or Punjabi suits.',
      locations: 'Punjab, Haryana, and among Sikh communities worldwide.',
      ritual: 'Visiting gurudwaras, community gatherings, performing Bhangra and Giddha dances, and agricultural celebrations.',
      color: 'yellow'
    },
    {
      id: 'bihu',
      name: 'Bihu',
      date: new Date(2025, 3, 15), // April 15, 2025
      region: ['northeast'],
      category: 'harvest',
      description: 'Assamese New Year and harvest festival with three distinct Bihu celebrations throughout the year.',
      traditional_attire: 'Traditional Assamese attire - men wear dhoti and kurta, women wear mekhela chador.',
      locations: 'Assam and neighboring northeastern states.',
      ritual: 'Traditional Bihu dance, feasting, exchange of gifts, and agricultural rituals.',
      color: 'yellow'
    },
    {
      id: 'rama-navami',
      name: 'Rama Navami',
      date: new Date(2025, 3, 17), // April 17, 2025
      region: ['north', 'south', 'east', 'west'],
      category: 'religious',
      description: 'Birthday celebration of Lord Rama, the seventh avatar of Vishnu.',
      traditional_attire: 'Traditional clothes in light colors, women in sarees or salwar kameez, men in kurta-pajama.',
      locations: 'Throughout India, especially in Ayodhya.',
      ritual: 'Temple visits, recitation of the Ramayana, bhajans (devotional songs), and community feasts.',
      color: 'purple'
    },
    {
      id: 'buddha-purnima',
      name: 'Buddha Purnima',
      date: new Date(2025, 4, 13), // May 13, 2025
      region: ['north', 'east', 'northeast'],
      category: 'religious',
      description: 'Celebrates the birth, enlightenment, and death of Gautama Buddha.',
      traditional_attire: 'Simple white clothes for both men and women.',
      locations: 'Buddhist communities across India, particularly in Bihar, Sikkim, and Ladakh.',
      ritual: 'Visiting Buddhist temples, meditation, giving to charity, and participating in prayer ceremonies.',
      color: 'purple'
    },
    {
      id: 'rath-yatra',
      name: 'Rath Yatra',
      date: new Date(2025, 6, 9), // July 9, 2025
      region: ['east'],
      category: 'religious',
      description: 'Chariot festival of Lord Jagannath, his brother Balabhadra and sister Subhadra.',
      traditional_attire: 'Traditional Odia attire - women wear sarees, men wear dhoti-kurta.',
      locations: 'Primarily in Puri, Odisha, but also observed in other parts of India.',
      ritual: 'Pulling massive wooden chariots carrying the deities through the streets of Puri.',
      color: 'purple'
    },
    {
      id: 'independence-day',
      name: 'Independence Day',
      date: new Date(2025, 7, 15), // August 15, 2025
      region: ['north', 'south', 'east', 'west', 'northeast'],
      category: 'national',
      description: 'National holiday celebrating India\'s independence from British rule in 1947.',
      traditional_attire: 'Many wear clothes resembling the colors of the Indian flag or traditional regional attire.',
      locations: 'Throughout India with the main ceremony at the Red Fort in Delhi.',
      ritual: 'Flag hoisting, singing patriotic songs, cultural performances, and remembering freedom fighters.',
      color: 'green'
    },
    {
      id: 'janmashtami',
      name: 'Janmashtami',
      date: new Date(2025, 7, 18), // August 18, 2025
      region: ['north', 'west'],
      category: 'religious',
      description: 'Celebrates the birth of Lord Krishna, the eighth avatar of Vishnu.',
      traditional_attire: 'Traditional Indian clothes, often in yellow and peacock colors associated with Krishna.',
      locations: 'Throughout India, especially in Mathura, Vrindavan, and Dwarka.',
      ritual: 'Fasting, singing bhajans, dahi handi competitions, midnight celebrations, and decorating Krishna idols.',
      color: 'purple'
    },
    {
      id: 'ganesh-chaturthi',
      name: 'Ganesh Chaturthi',
      date: new Date(2025, 8, 3), // September 3, 2025
      region: ['west', 'south'],
      category: 'religious',
      description: 'Birthday celebration of Lord Ganesha with elaborate installations of Ganesha idols.',
      traditional_attire: 'Traditional regional attire, often new clothes.',
      locations: 'Maharashtra, Goa, Karnataka, and many other parts of India.',
      ritual: 'Installation of Ganesha idols at home and in public, daily worship for 1-10 days, and immersion in water bodies.',
      color: 'purple'
    },
    {
      id: 'onam',
      name: 'Onam',
      date: new Date(2025, 8, 7), // September 7, 2025 (first day)
      region: ['south'],
      category: 'harvest',
      description: 'Harvest festival of Kerala celebrating King Mahabali\'s annual visit.',
      traditional_attire: 'Women wear the traditional Kerala saree (Kasavu), men wear mundu (dhoti).',
      locations: 'Kerala and among Malayali communities worldwide.',
      ritual: 'Creating flower carpets (pookalam), preparing elaborate feasts (Onam Sadhya), boat races, and cultural performances.',
      color: 'yellow'
    },
    {
      id: 'navratri',
      name: 'Navratri',
      date: new Date(2025, 8, 23), // September 23, 2025 (first day)
      region: ['north', 'west', 'east'],
      category: 'religious',
      description: 'Nine nights dedicated to the nine forms of Goddess Durga.',
      traditional_attire: 'Varies by region - traditional lehenga-choli, saree, or kurta with bright colors in Gujarat and Rajasthan.',
      locations: 'Throughout India with regional variations.',
      ritual: 'Varies by region - Garba and Dandiya Raas dances in Gujarat, Durga Puja in Bengal, fasting, and temple visits.',
      color: 'purple'
    },
    {
      id: 'dussehra',
      name: 'Dussehra',
      date: new Date(2025, 9, 2), // October 2, 2025
      region: ['north', 'south', 'east', 'west'],
      category: 'religious',
      description: 'Celebrates the victory of Lord Rama over Ravana, symbolizing the triumph of good over evil.',
      traditional_attire: 'Traditional regional attire, often new clothes for the occasion.',
      locations: 'Throughout India with notable celebrations in Delhi, Mysore, and Kullu.',
      ritual: 'Burning effigies of Ravana, theatrical reenactments of the Ramayana (Ram Lila), and processions.',
      color: 'purple'
    },
    {
      id: 'diwali',
      name: 'Diwali',
      date: new Date(2025, 9, 21), // October 21, 2025
      region: ['north', 'south', 'east', 'west', 'northeast'],
      category: 'religious',
      description: 'Festival of lights celebrating the return of Lord Rama to Ayodhya and the victory of light over darkness.',
      traditional_attire: 'New traditional clothes - women wear sarees or lehenga-choli, men wear kurta-pajama or sherwani.',
      locations: 'Throughout India and among Indian communities worldwide.',
      ritual: 'Lighting oil lamps and candles, fireworks, prayers to Goddess Lakshmi, exchange of gifts, and family gatherings.',
      color: 'purple'
    },
    {
      id: 'chhath-puja',
      name: 'Chhath Puja',
      date: new Date(2025, 9, 25), // October 25, 2025
      region: ['east', 'north'],
      category: 'religious',
      description: 'Ancient Hindu festival dedicated to the Sun God and Chhathi Maiya (the sixth form of Devi).',
      traditional_attire: 'Traditional attire - women wear sarees, men wear dhoti-kurta.',
      locations: 'Bihar, Jharkhand, Eastern UP, and parts of Nepal.',
      ritual: 'Fasting, standing in water, offering prayers to the setting and rising sun, preparing traditional prasad.',
      color: 'purple'
    },
    {
      id: 'guru-nanak-jayanti',
      name: 'Guru Nanak Jayanti',
      date: new Date(2025, 10, 13), // November 13, 2025
      region: ['north'],
      category: 'religious',
      description: 'Birthday celebration of Guru Nanak Dev Ji, the first Sikh Guru and founder of Sikhism.',
      traditional_attire: 'Traditional Punjabi attire or modest clothing for gurudwara visits.',
      locations: 'Throughout India, especially in Punjab and Sikh communities worldwide.',
      ritual: 'Akhand Path (48-hour non-stop reading of the Guru Granth Sahib), processions (Nagar Kirtan), langar (community meals).',
      color: 'purple'
    },
    {
      id: 'christmas',
      name: 'Christmas',
      date: new Date(2025, 11, 25), // December 25, 2025
      region: ['north', 'south', 'east', 'west', 'northeast'],
      category: 'religious',
      description: 'Celebration of the birth of Jesus Christ, observed by Christians worldwide.',
      traditional_attire: 'Formal or festive clothes, often in red, green, and white colors.',
      locations: 'Throughout India, especially in regions with Christian populations like Goa, Kerala, and Northeast India.',
      ritual: 'Attending midnight mass, decorating Christmas trees, exchanging gifts, and family feasts.',
      color: 'blue'
    }
  ];

  // Filter variables
  let currentRegionFilter = 'all';
  let currentMonthFilter = 'all';
  let currentCategoryFilter = 'all';
  
  // Calendar variables
  let currentMonth = new Date().getMonth();
  let currentYear = new Date().getFullYear();
  
  // Set up filter event listeners
  const regionFilter = document.getElementById('regionFilter');
  const monthFilter = document.getElementById('monthFilter');
  const categoryFilter = document.getElementById('categoryFilter');
  const applyFilters = document.getElementById('applyFilters');
  
  applyFilters.addEventListener('click', function() {
    currentRegionFilter = regionFilter.value;
    currentMonthFilter = monthFilter.value;
    currentCategoryFilter = categoryFilter.value;
    
    // Update both views with new filters
    updateListView();
    updateCalendarView();
  });
  
  // Set up calendar navigation
  const prevMonthBtn = document.getElementById('prevMonth');
  const nextMonthBtn = document.getElementById('nextMonth');
  const currentMonthYearDisplay = document.getElementById('currentMonthYear');
  
  prevMonthBtn.addEventListener('click', function() {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    updateCalendarView();
  });
  
  nextMonthBtn.addEventListener('click', function() {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    updateCalendarView();
  });
  
  // Function to filter festivals based on current filters
  function getFilteredFestivals() {
    return festivals.filter(festival => {
      // Region filter
      if (currentRegionFilter !== 'all' && !festival.region.includes(currentRegionFilter)) {
        return false;
      }
      
      // Month filter
      if (currentMonthFilter !== 'all') {
        const monthNames = ['january', 'february', 'march', 'april', 'may', 'june', 
                            'july', 'august', 'september', 'october', 'november', 'december'];
        const festivalMonth = festival.date.getMonth();
        if (monthNames[festivalMonth] !== currentMonthFilter) {
          return false;
        }
      }
      
      // Category filter
      if (currentCategoryFilter !== 'all' && festival.category !== currentCategoryFilter) {
        return false;
      }
      
      return true;
    });
  }
  
  // Function to update list view
  function updateListView() {
    const festivalsList = document.getElementById('festivalsList');
    festivalsList.innerHTML = '';
    
    const filteredFestivals = getFilteredFestivals();
    
    // Sort festivals by date
    filteredFestivals.sort((a, b) => a.date - b.date);
    
    if (filteredFestivals.length === 0) {
      festivalsList.innerHTML = `
        <div class="bg-gray-800 rounded-xl p-6 shadow-lg text-center">
          <p class="text-gray-400">No festivals found matching your filters. Try adjusting your criteria.</p>
        </div>
      `;
      return;
    }
    
    filteredFestivals.forEach(festival => {
      const festivalElement = document.createElement('div');
      festivalElement.className = 'bg-gray-800 rounded-xl overflow-hidden shadow-lg';
      festivalElement.innerHTML = `
        <div class="md:flex">
          <div class="md:w-1/4 bg-gradient-to-br from-${festival.color}-500 to-${festival.color}-700 flex items-center justify-center py-6 md:py-0">
            <div class="text-center">
              <div class="text-2xl font-bold">${festival.date.getDate()}</div>
              <div>${getMonthName(festival.date.getMonth())}</div>
              <div>${festival.date.getFullYear()}</div>
            </div>
          </div>
          <div class="p-6 md:w-3/4">
            <div class="flex justify-between items-start mb-2">
              <h3 class="text-xl font-bold">${festival.name}</h3>
              <span class="ml-2 text-xs font-semibold px-2 py-1 rounded-full bg-${festival.color}-500">${capitalizeFirstLetter(festival.category)}</span>
            </div>
            <p class="text-gray-400 mb-4">${truncateText(festival.description, 120)}</p>
            <div class="flex justify-between items-center">
              <div class="text-sm text-gray-500">
                <i class="fas fa-map-marker-alt mr-1"></i> ${getRegionNames(festival.region)}
              </div>
              <button class="modal-open-btn px-4 py-2 rounded-md text-pink-500 border border-pink-500 hover:bg-pink-500 hover:text-white transition-colors" data-festival-id="${festival.id}">
                View Details
              </button>
            </div>
          </div>
        </div>
      `;
      
      festivalsList.appendChild(festivalElement);
      
      // Add event listener to the button
      const viewDetailsBtn = festivalElement.querySelector('.modal-open-btn');
      viewDetailsBtn.addEventListener('click', function() {
        openFestivalModal(festival);
      });
    });
  }
  
  // Function to update calendar view
  function updateCalendarView() {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                        'July', 'August', 'September', 'October', 'November', 'December'];
    
    currentMonthYearDisplay.textContent = `${monthNames[currentMonth]} ${currentYear}`;
    
    const calendarGrid = document.getElementById('calendarGrid');
    calendarGrid.innerHTML = '';
    
    // Get first day of the month
    const firstDay = new Date(currentYear, currentMonth, 1);
    const startingDay = firstDay.getDay(); // Day of week (0 = Sunday, 6 = Saturday)
    
    // Get number of days in the month
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const totalDays = lastDay.getDate();
    
    // Get filtered festivals for current month
    const filteredFestivals = getFilteredFestivals().filter(festival => 
      festival.date.getMonth() === currentMonth && festival.date.getFullYear() === currentYear
    );
    
    // Create empty cells for days before the first day of the month
    for (let i = 0; i < startingDay; i++) {
      const emptyCell = document.createElement('div');
      emptyCell.className = 'aspect-square bg-gray-800 rounded-lg p-2 opacity-50';
      calendarGrid.appendChild(emptyCell);
    }
    
    // Create cells for each day of the month
    for (let day = 1; day <= totalDays; day++) {
      const currentDate = new Date(currentYear, currentMonth, day);
      const dayCell = document.createElement('div');
      dayCell.className = 'aspect-square bg-gray-800 rounded-lg p-2 relative';
      
      // Find festivals on this day
      const dayFestivals = filteredFestivals.filter(festival => 
        festival.date.getDate() === day
      );
      
      // Create content for the day cell
      let cellContent = `
        <div class="text-xl font-bold ${dayFestivals.length > 0 ? 'mb-2' : ''}">${day}</div>
      `;
      
      if (dayFestivals.length > 0) {
        cellContent += `<div class="space-y-1">`;
        dayFestivals.forEach(festival => {
          cellContent += `
            <div class="text-xs p-1 rounded bg-${festival.color}-500 bg-opacity-40 truncate cursor-pointer festival-cell" data-festival-id="${festival.id}">
              ${festival.name}
            </div>
          `;
        });
        cellContent += `</div>`;
      }
      
      dayCell.innerHTML = cellContent;
      calendarGrid.appendChild(dayCell);
      
      // Add event listeners to festival cells
      const festivalCells = dayCell.querySelectorAll('.festival-cell');
      festivalCells.forEach(cell => {
        cell.addEventListener('click', function() {
          const festivalId = cell.getAttribute('data-festival-id');
          const festival = festivals.find(f => f.id === festivalId);
          openFestivalModal(festival);
        });
      });
    }
  }
  
  // Function to open festival modal
  function openFestivalModal(festival) {
    const festivalModal = document.getElementById('festivalModal');
    const festivalModalContent = document.getElementById('festivalModalContent');
    
    const regionNames = getRegionNames(festival.region);
    
    festivalModalContent.innerHTML = `
      <div class="text-center mb-6">
        <h2 class="text-3xl font-bold mb-2">${festival.name}</h2>
        <div class="inline-block px-3 py-1 rounded-full bg-${festival.color}-500 text-sm">
          ${capitalizeFirstLetter(festival.category)}
        </div>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div>
          <h3 class="text-lg font-semibold mb-2"><i class="far fa-calendar-alt mr-2"></i>Date</h3>
          <p>${formatDate(festival.date)}</p>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-2"><i class="fas fa-map-marker-alt mr-2"></i>Region</h3>
          <p>${regionNames}</p>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-2"><i class="fas fa-map mr-2"></i>Locations</h3>
          <p>${festival.locations}</p>
        </div>
      </div>
      
      <div class="mb-6">
        <h3 class="text-lg font-semibold mb-2"><i class="fas fa-info-circle mr-2"></i>Description</h3>
        <p>${festival.description}</p>
      </div>
      
      <div class="mb-6">
        <h3 class="text-lg font-semibold mb-2"><i class="fas fa-om mr-2"></i>Rituals & Customs</h3>
        <p>${festival.ritual}</p>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2"><i class="fas fa-tshirt mr-2"></i>Traditional Attire</h3>
        <p>${festival.traditional_attire}</p>
      </div>
    `;
    
    festivalModal.classList.remove('hidden');
  }
  
  // Helper functions
  function getMonthName(month) {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                        'July', 'August', 'September', 'October', 'November', 'December'];
    return monthNames[month];
  }
  
  function getColorForCategory(category) {
    const colorMap = {
      'religious': 'purple',
      'cultural': 'blue',
      'harvest': 'yellow',
      'national': 'green'
    };
    return colorMap[category] || 'gray';
  }
  
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  }
  
  function getRegionNames(regions) {
    const regionMap = {
      'north': 'North India',
      'south': 'South India',
      'east': 'East India',
      'west': 'West India',
      'northeast': 'Northeast India'
    };
    
    return regions.map(region => regionMap[region]).join(', ');
  }
  
  function formatDate(date) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }
  
  // Initialize views
  updateListView();
  updateCalendarView();
  
  // Connect festival links in featured festivals section
  const festivalLinks = document.querySelectorAll('.festival-link');
  festivalLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefaulte.preventDefault();
      const festivalId = this.getAttribute('data-festival');
      const festival = festivals.find(f => f.id === festivalId);
      if (festival) {
        openFestivalModal(festival);
      }
    });
  });

  // Try outfit button functionality
  // Try outfit button functionality
const tryOutfitButton = document.getElementById('tryOutfitButton');
if (tryOutfitButton) {
  tryOutfitButton.addEventListener('click', function() {
    // Redirect to home page instead of chatbot
    const modalTitle = document.querySelector('#festivalModalContent h2');
    if (modalTitle) {
      // even if we get festivalName, now redirect to home
      window.location.href = 'index.html'; // <-- home page
    }
  });
}
});