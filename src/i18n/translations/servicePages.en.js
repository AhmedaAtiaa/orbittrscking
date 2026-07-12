/** Service detail pages — English */
export default {
  back: 'Back to home',
  backServices: 'All solutions',
  notFound: 'Service not found',
  requestQuote: 'Get a quote',
  talkWhatsapp: 'WhatsApp us',
  systemLabel: 'System & platform',
  howLabel: 'How it works',
  benefitsLabel: 'Benefits',
  useCasesLabel: 'Use cases',
  featuresLabel: 'Key features',
  relatedLabel: 'Related solutions',
  pages: {
    gps: {
      eyebrow: 'Tracking',
      title: 'GPS Tracking Solutions',
      summary:
        'Orbit provides advanced GPS tracking solutions that enable real-time vehicle monitoring, including live location, trip history, speed, engine hours, instant alerts, and analytical reports to improve fleet efficiency and reduce operating costs.',
      overview: [
        'Orbit’s standard tracking platform gives companies live visibility of their fleet without complexity. Certified GPS devices connect to the cloud platform to show location, status, and routes on an interactive map from any browser or mobile app.',
        'Organizations can set operating policies (speed, geofences, working hours) and receive instant alerts on violations, with reports ready for management and operations.',
      ],
      system: [
        'GPS/4G trackers installed on vehicles send location and operational data securely at set intervals.',
        'Cloud platform receives data and displays live maps with searchable history.',
        'Multi-user dashboard with roles (fleet manager, supervisor, finance).',
        'Mobile app for quick notifications and on-the-go fleet monitoring.',
      ],
      steps: [
        { title: 'Install & connect', text: 'Install the device and link it to your Orbit account.' },
        { title: 'Live streaming', text: 'Start receiving location, speed, and engine hours immediately.' },
        { title: 'Policies & alerts', text: 'Configure limits and alerts to match your operating rules.' },
        { title: 'Reports & improve', text: 'Review reports and cut waste while raising efficiency.' },
      ],
      benefits: [
        'Live visibility of every vehicle',
        'Lower costs by spotting idle time and waste',
        'Better route and schedule compliance',
        'Reports that support decisions',
      ],
      useCases: [
        'Truck and road freight fleets',
        'Commercial and service vehicles',
        'Distribution and delivery companies',
        'Organizations needing daily operational control',
      ],
      features: [
        'Live GPS location',
        'Trip and route history',
        'Speed and engine hours monitoring',
        'Instant alerts',
        'Analytical reports',
        'Multi-user permissions',
      ],
    },
    rental: {
      eyebrow: 'Car rental',
      title: 'Car Rental Tracking Solutions',
      summary:
        'Designed specifically for car rental companies, our solutions provide real-time tracking, vehicle utilization monitoring, geofencing, and unauthorized usage alerts to enhance asset protection and operational efficiency.',
      overview: [
        'Orbit’s rental solution links every rented vehicle to the platform so you know where it is, who is using it, and whether it left the contracted area.',
        'Operations teams reduce disputes, recover vehicles faster, and improve fleet utilization.',
      ],
      system: [
        'Live tracking of each rental vehicle with ignition and movement status.',
        'Geofencing for delivery zones and allowed usage areas.',
        'Alerts for out-of-zone or off-contract usage.',
        'Daily/monthly utilization reports for pricing and operations.',
      ],
      steps: [
        { title: 'Connect the fleet', text: 'Register vehicles and link trackers to the company account.' },
        { title: 'Define contracts', text: 'Set usage zones based on rental type.' },
        { title: 'Monitor', text: 'Follow usage and alerts during the rental period.' },
        { title: 'Report', text: 'Issue utilization and compliance reports after return.' },
      ],
      benefits: [
        'Stronger asset protection',
        'Faster detection of unauthorized use',
        'Better customer service with accurate data',
        'Higher fleet utilization',
      ],
      useCases: [
        'Daily and monthly rentals',
        'Corporate rental fleets',
        'Workshop replacement cars',
        'Limousine and operational rental',
      ],
      features: [
        'Real-time tracking',
        'Utilization monitoring',
        'Geofencing',
        'Unauthorized usage alerts',
        'Rental operations reports',
      ],
    },
    temp: {
      eyebrow: 'Cold chain',
      title: 'Temperature & Humidity Monitoring',
      summary:
        'Smart monitoring solutions for temperature and humidity in refrigerated vehicles and warehouses, featuring instant alerts and detailed reports to ensure product integrity and cold chain compliance.',
      overview: [
        'The solution combines temperature/humidity sensors with the tracking platform for a continuous log across trips and warehouses, with instant alerts on any threshold breach.',
        'Ideal for food, pharma, and sensitive goods that require cold-chain proof.',
      ],
      system: [
        'Accurate sensors inside the refrigerated compartment or warehouse.',
        'Linked to the tracker to send readings with location.',
        'Customizable alert thresholds (min/max).',
        'Historical logs for compliance and audits.',
      ],
      steps: [
        { title: 'Install sensors', text: 'Mount sensors and connect them to the platform.' },
        { title: 'Set thresholds', text: 'Define temperature and humidity ranges by cargo type.' },
        { title: 'Live monitor', text: 'Watch readings and alerts during transport and storage.' },
        { title: 'Report', text: 'Export compliance logs for customers and regulators.' },
      ],
      benefits: [
        'Protect product quality',
        'Reduce spoilage losses',
        'Prove compliance easily',
        'Faster response to deviations',
      ],
      useCases: [
        'Chilled and frozen food transport',
        'Pharmaceuticals',
        'Cold warehouses',
        'Heat-sensitive supply chains',
      ],
      features: [
        'Temp & humidity monitoring',
        'Instant alerts',
        'Detailed reports',
        'Cold chain compliance',
        'History linked to location',
      ],
    },
    weight: {
      eyebrow: 'Payload',
      title: 'Truck Weight Management',
      summary:
        'Advanced truck weight management solutions that monitor payloads in real time, helping prevent overloading, optimize load distribution, reduce fuel consumption, and ensure regulatory compliance.',
      overview: [
        'Weight management lets you know actual payload during operations and link it to the vehicle and trip—reducing overload violations and improving safety and fuel use.',
      ],
      system: [
        'Capture/receive weight data linked to the vehicle ID.',
        'Show payload live inside the tracking dashboard.',
        'Alerts when limits are exceeded.',
        'Load and distribution reports for operations and compliance.',
      ],
      steps: [
        { title: 'Integrate', text: 'Connect the weight system to Orbit.' },
        { title: 'Limits', text: 'Set payload limits by vehicle type.' },
        { title: 'Monitor', text: 'Track weights and alerts during trips.' },
        { title: 'Optimize', text: 'Analyze distribution and cut waste and violations.' },
      ],
      benefits: [
        'Prevent overloading',
        'Optimize load distribution',
        'Reduce fuel consumption',
        'Stay compliant',
      ],
      useCases: [
        'Construction materials transport',
        'Heavy trucks',
        'Mining and industrial haulage',
        'Any fleet under weight regulation',
      ],
      features: [
        'Real-time weight monitoring',
        'Overload alerts',
        'Load distribution optimization',
        'Compliance reports',
      ],
    },
    school: {
      eyebrow: 'Education transport',
      title: 'School Transportation Solutions',
      summary:
        'Comprehensive school transportation solutions featuring live tracking, route monitoring, arrival and departure notifications, and performance reports to ensure student safety and operational excellence.',
      overview: [
        'School transport focuses on student safety and clear communication with parents and school management, with bus tracking and route/schedule compliance.',
      ],
      system: [
        'Live tracking for school buses.',
        'Configurable arrival and departure alerts.',
        'Route and stop monitoring.',
        'Performance reports for operators and management.',
      ],
      steps: [
        { title: 'Equip buses', text: 'Install trackers and link them to the account.' },
        { title: 'Routes', text: 'Define lines and stop points.' },
        { title: 'Alerts', text: 'Enable arrival and departure notifications.' },
        { title: 'Follow-up', text: 'Review compliance and performance daily.' },
      ],
      benefits: [
        'Higher student safety',
        'Transparency for parents and management',
        'Better route compliance',
        'Improved operating efficiency',
      ],
      useCases: [
        'Private and public schools',
        'University transport',
        'Training centers and academies',
        'School transport contractors',
      ],
      features: [
        'Live bus tracking',
        'Route monitoring',
        'Arrival & departure alerts',
        'Performance reports',
      ],
    },
    specialized: {
      eyebrow: 'Specialized transport',
      title: 'Specialized & Contract Transportation',
      summary:
        'Smart fleet management solutions for specialized and contract transportation, offering real-time tracking, trip management, driver monitoring, and operational reporting for maximum fleet performance.',
      overview: [
        'Built for specialized and contract fleets with many trips, clients, and drivers—needing central control of performance and cost.',
      ],
      system: [
        'Live tracking and multi-trip management.',
        'Driver behavior monitoring and alerts.',
        'KPI dashboards for performance and utilization.',
        'Operational reports by contract/client.',
      ],
      steps: [
        { title: 'Set up the fleet', text: 'Register vehicles, drivers, and contracts.' },
        { title: 'Run trips', text: 'Monitor execution live from the platform.' },
        { title: 'Control', text: 'Performance and compliance alerts.' },
        { title: 'Report', text: 'Measure utilization and improve contracts.' },
      ],
      benefits: [
        'Better fleet utilization',
        'Control over drivers and trips',
        'Clearer contract data',
        'Improved operating margins',
      ],
      useCases: [
        'Corporate contract transport',
        'Operational rental fleets',
        'Multi-destination specialized haulage',
        'Logistics operators',
      ],
      features: [
        'Real-time tracking',
        'Trip management',
        'Driver monitoring',
        'Operational reporting',
      ],
    },
    fuel: {
      eyebrow: 'Fuel',
      title: 'Fuel Management Solutions',
      summary:
        'Advanced fuel management solutions that monitor fuel consumption and tank levels, detect refueling and draining events, identify abnormal fuel usage, and provide analytical reports to reduce operating costs.',
      overview: [
        'Fuel is one of the largest fleet costs. The solution links level sensors to the tracking platform to detect waste and tampering and improve consumption.',
      ],
      system: [
        'Accurate fuel level sensors.',
        'Detection of refuel and drain events.',
        'Abnormal consumption alerts.',
        'Analytical reports on consumption and cost.',
      ],
      steps: [
        { title: 'Install', text: 'Install the fuel sensor and connect it to the platform.' },
        { title: 'Calibrate', text: 'Tune readings for the tank and vehicle.' },
        { title: 'Monitor', text: 'Follow levels, events, and alerts.' },
        { title: 'Optimize', text: 'Analyze consumption and cut waste.' },
      ],
      benefits: [
        'Lower fuel costs',
        'Detect tampering and drainage',
        'Clearer consumption visibility',
        'Better pricing and operating decisions',
      ],
      useCases: [
        'Heavy trucks',
        'Distribution fleets',
        'Equipment and machinery',
        'Any fuel-intensive fleet',
      ],
      features: [
        'Consumption and tank monitoring',
        'Refuel & drain detection',
        'Abnormal usage alerts',
        'Cost-saving reports',
      ],
    },
    equipment: {
      eyebrow: 'Equipment',
      title: 'Equipment Management Solutions',
      summary:
        'Professional equipment management solutions for tracking heavy machinery and assets, including location tracking, engine hours monitoring, preventive maintenance scheduling, and utilization analysis to maximize asset lifespan and productivity.',
      overview: [
        'Tracking equipment across sites with engine hours helps prevent loss, schedule maintenance, and improve asset productivity.',
      ],
      system: [
        'Location tracking for equipment and machinery.',
        'Engine hours and utilization monitoring.',
        'Preventive maintenance alerts.',
        'Asset utilization reports.',
      ],
      steps: [
        { title: 'Register assets', text: 'Add equipment and link trackers.' },
        { title: 'Monitor', text: 'Follow location and working hours.' },
        { title: 'Maintain', text: 'Schedule maintenance based on real use.' },
        { title: 'Analyze', text: 'Measure productivity and asset life.' },
      ],
      benefits: [
        'Longer asset life',
        'Fewer unplanned stoppages',
        'Always know where equipment is',
        'Higher productivity',
      ],
      useCases: [
        'Construction sites',
        'Heavy equipment',
        'Agricultural and industrial machinery',
        'Equipment rental companies',
      ],
      features: [
        'Equipment location',
        'Engine hours',
        'Preventive maintenance',
        'Utilization analysis',
      ],
    },
    waste: {
      eyebrow: 'Waste',
      title: 'Waste Management Solutions',
      summary:
        'Orbit provides smart Waste Management Solutions for waste collection and transportation fleets. The solution enables real-time vehicle tracking, route and schedule compliance monitoring, fleet performance analysis, operational reporting, and instant alerts to improve efficiency, reduce operating costs, and enhance municipal and environmental services.',
      overview: [
        'An integrated solution for waste operators and municipalities to control routes and schedules and measure fleet operational and environmental performance.',
      ],
      system: [
        'Live tracking of collection and haulage vehicles.',
        'Route and schedule compliance monitoring.',
        'Fleet performance analysis and operational reports.',
        'Instant alerts to improve response.',
      ],
      steps: [
        { title: 'Connect the fleet', text: 'Onboard collection vehicles on the platform.' },
        { title: 'Routes', text: 'Define schedules and collection routes.' },
        { title: 'Operate', text: 'Monitor compliance and alerts daily.' },
        { title: 'Improve', text: 'Analyze performance and cut costs.' },
      ],
      benefits: [
        'Higher collection efficiency',
        'Better schedule compliance',
        'Lower operating costs',
        'Better municipal service quality',
      ],
      useCases: [
        'Municipalities',
        'Contracted cleaning companies',
        'Industrial waste haulage',
        'Specialized environmental services',
      ],
      features: [
        'Collection fleet tracking',
        'Route & schedule compliance',
        'Fleet performance analysis',
        'Operational alerts & reports',
      ],
    },
    dashcamAi: {
      eyebrow: 'Safety & AI',
      title: 'AI Dash Cam Solutions',
      summary:
        'Enhance fleet safety with intelligent AI-powered dash cameras that provide real-time video monitoring, driver behavior analysis, and advanced safety alerts to reduce accidents and improve operational efficiency.',
      overview: [
        'AI Dash Cam combines HD video with on-road and in-cabin behavior analysis, linked to location and a cloud platform for event and video management.',
        'It helps reduce accidents, improve driver behavior, and document incidents quickly when needed.',
      ],
      system: [
        'Front, cabin, and rear HD cameras.',
        'ADAS for road-risk alerts and driver assistance.',
        'DMS to detect fatigue, distraction, and phone use.',
        'Live streaming, event recording, and secure cloud storage with GPS.',
      ],
      steps: [
        { title: 'Install', text: 'Install cameras and connect them to the platform.' },
        { title: 'Configure', text: 'Enable ADAS/DMS rules and alerts.' },
        { title: 'Monitor', text: 'Follow live streams and events.' },
        { title: 'Improve', text: 'Analyze behavior and reduce risk.' },
      ],
      benefits: [
        'Higher safety and fewer accidents',
        'Better driver behavior',
        'Instant event documentation',
        'Centralized video management',
      ],
      useCases: [
        'Trucks and buses',
        'Rental fleets',
        'Light commercial vehicles',
        'Any safety-focused fleet',
      ],
      features: [
        'Front, cabin, and rear HD cameras',
        'ADAS road safety alerts',
        'DMS for fatigue, distraction & phone use',
        'Live video streaming with GPS',
        'Automatic event recording & secure storage',
        'Instant alerts for risky driving & collisions',
        'Cloud-based video management',
        'Ideal for trucks, buses, rental fleets, and commercial vehicles',
      ],
    },
  },
}
