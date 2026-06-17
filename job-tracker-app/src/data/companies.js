/**
 * Curated directory of companies that actively hire backend / full-stack
 * engineers — Java, Spring Boot, React, DevOps, Cloud, Microservices.
 *
 * Verified, recognizable employers worldwide, with strong coverage of India's
 * new-age tech ecosystem (CRED, Groww, Razorpay, Swiggy, Zerodha, Freshworks…)
 * alongside global product companies, fintech, and IT services.
 *
 * Loads instantly (no API). `tags` = the stacks each company is known to hire
 * for, which power the stack filter and the chips on each card.
 *
 * Fields: name, country, industry, website, tags[].
 */
export const COMPANIES = [
  // ── United States — product / big tech ──
  { name: 'Google', country: 'United States', industry: 'Technology', website: 'https://careers.google.com', tags: ['Java', 'Go', 'GCP', 'Kubernetes', 'Microservices'] },
  { name: 'Amazon', country: 'United States', industry: 'Technology · Cloud', website: 'https://www.amazon.jobs', tags: ['Java', 'AWS', 'DevOps', 'Microservices'] },
  { name: 'Microsoft', country: 'United States', industry: 'Technology · Cloud', website: 'https://careers.microsoft.com', tags: ['Java', 'Azure', 'React', 'DevOps'] },
  { name: 'Apple', country: 'United States', industry: 'Technology', website: 'https://www.apple.com/careers', tags: ['Java', 'Cloud', 'Microservices'] },
  { name: 'Meta', country: 'United States', industry: 'Social · Technology', website: 'https://www.metacareers.com', tags: ['React', 'Java', 'Microservices'] },
  { name: 'Netflix', country: 'United States', industry: 'Streaming', website: 'https://jobs.netflix.com', tags: ['Java', 'Spring Boot', 'AWS', 'Microservices'] },
  { name: 'Uber', country: 'United States', industry: 'Mobility', website: 'https://www.uber.com/careers', tags: ['Java', 'Go', 'React', 'Microservices'] },
  { name: 'Airbnb', country: 'United States', industry: 'Travel Tech', website: 'https://careers.airbnb.com', tags: ['Java', 'React', 'AWS', 'Microservices'] },
  { name: 'LinkedIn', country: 'United States', industry: 'Professional Network', website: 'https://careers.linkedin.com', tags: ['Java', 'Kafka', 'Microservices', 'Cloud'] },
  { name: 'Salesforce', country: 'United States', industry: 'Cloud Software', website: 'https://careers.salesforce.com', tags: ['Java', 'Spring Boot', 'React', 'Cloud'] },
  { name: 'Oracle', country: 'United States', industry: 'Enterprise Software', website: 'https://www.oracle.com/careers', tags: ['Java', 'Cloud', 'Microservices'] },
  { name: 'IBM', country: 'United States', industry: 'Technology · Cloud', website: 'https://www.ibm.com/careers', tags: ['Java', 'Cloud', 'Kubernetes', 'DevOps'] },
  { name: 'Adobe', country: 'United States', industry: 'Software', website: 'https://www.adobe.com/careers.html', tags: ['Java', 'React', 'AWS', 'Microservices'] },
  { name: 'Cisco', country: 'United States', industry: 'Networking', website: 'https://jobs.cisco.com', tags: ['Java', 'Spring Boot', 'Cloud', 'DevOps'] },
  { name: 'PayPal', country: 'United States', industry: 'Fintech', website: 'https://careers.pypl.com', tags: ['Java', 'Spring Boot', 'React', 'Microservices'] },
  { name: 'Tesla', country: 'United States', industry: 'Automotive · Energy', website: 'https://www.tesla.com/careers', tags: ['Java', 'React', 'Cloud'] },
  { name: 'ServiceNow', country: 'United States', industry: 'Cloud Software', website: 'https://careers.servicenow.com', tags: ['Java', 'Spring Boot', 'AngularJS', 'Cloud'] },
  { name: 'Intuit', country: 'United States', industry: 'Fintech Software', website: 'https://www.intuit.com/careers', tags: ['Java', 'Spring Boot', 'React', 'AWS'] },
  { name: 'Walmart Global Tech', country: 'United States', industry: 'Retail · Product', website: 'https://careers.walmart.com', tags: ['Java', 'Spring Boot', 'React', 'Kubernetes'] },
  { name: 'The Walt Disney Company', country: 'United States', industry: 'Media · Streaming', website: 'https://jobs.disneycareers.com', tags: ['Java', 'React', 'AWS', 'Microservices'] },
  // ── United States — fintech / finance ──
  { name: 'Stripe', country: 'United States', industry: 'Fintech', website: 'https://stripe.com/jobs', tags: ['Java', 'React', 'Ruby', 'Microservices'] },
  { name: 'Block', country: 'United States', industry: 'Fintech', website: 'https://block.xyz/careers', tags: ['Java', 'Kotlin', 'React', 'Microservices'] },
  { name: 'Coinbase', country: 'United States', industry: 'Crypto · Fintech', website: 'https://www.coinbase.com/careers', tags: ['Java', 'Go', 'React', 'AWS'] },
  { name: 'Robinhood', country: 'United States', industry: 'Fintech', website: 'https://careers.robinhood.com', tags: ['Java', 'Python', 'React', 'AWS'] },
  { name: 'Capital One', country: 'United States', industry: 'Fintech', website: 'https://www.capitalonecareers.com', tags: ['Java', 'Spring Boot', 'AWS', 'DevOps'] },
  { name: 'JPMorgan Chase', country: 'United States', industry: 'Finance', website: 'https://careers.jpmorgan.com', tags: ['Java', 'Spring Boot', 'React', 'Cloud'] },
  { name: 'Goldman Sachs', country: 'United States', industry: 'Finance', website: 'https://www.goldmansachs.com/careers', tags: ['Java', 'Spring Boot', 'Microservices'] },
  { name: 'Morgan Stanley', country: 'United States', industry: 'Finance', website: 'https://www.morganstanley.com/careers', tags: ['Java', 'Spring Boot', 'Cloud'] },
  { name: 'American Express', country: 'United States', industry: 'Finance', website: 'https://www.americanexpress.com/en-us/careers', tags: ['Java', 'Spring Boot', 'React', 'DevOps'] },
  { name: 'Visa', country: 'United States', industry: 'Fintech', website: 'https://corporate.visa.com/en/jobs.html', tags: ['Java', 'Spring Boot', 'Microservices'] },
  { name: 'Mastercard', country: 'United States', industry: 'Fintech', website: 'https://careers.mastercard.com', tags: ['Java', 'Spring Boot', 'Cloud', 'DevOps'] },
  // ── United States — SaaS / DevOps / data ──
  { name: 'GitHub', country: 'United States', industry: 'Developer Tools', website: 'https://www.github.careers', tags: ['Ruby', 'Go', 'React', 'DevOps'] },
  { name: 'GitLab', country: 'United States', industry: 'DevOps', website: 'https://about.gitlab.com/jobs', tags: ['Go', 'Ruby', 'DevOps', 'Kubernetes'] },
  { name: 'HashiCorp', country: 'United States', industry: 'DevOps · Cloud', website: 'https://www.hashicorp.com/careers', tags: ['Go', 'DevOps', 'Kubernetes', 'Cloud'] },
  { name: 'Datadog', country: 'United States', industry: 'Observability', website: 'https://careers.datadoghq.com', tags: ['Java', 'Go', 'AWS', 'Kubernetes'] },
  { name: 'Snowflake', country: 'United States', industry: 'Data Cloud', website: 'https://careers.snowflake.com', tags: ['Java', 'React', 'AWS', 'Cloud'] },
  { name: 'Databricks', country: 'United States', industry: 'Data · AI', website: 'https://www.databricks.com/company/careers', tags: ['Scala', 'Java', 'Spark', 'Cloud'] },
  { name: 'MongoDB', country: 'United States', industry: 'Database', website: 'https://www.mongodb.com/careers', tags: ['Java', 'React', 'Cloud', 'Microservices'] },
  { name: 'Confluent', country: 'United States', industry: 'Data Infrastructure', website: 'https://www.confluent.io/careers', tags: ['Java', 'Kafka', 'Cloud', 'Kubernetes'] },
  { name: 'Elastic', country: 'United States', industry: 'Search · Data', website: 'https://www.elastic.co/careers', tags: ['Java', 'Go', 'Cloud', 'DevOps'] },
  { name: 'Red Hat', country: 'United States', industry: 'Open Source · Cloud', website: 'https://www.redhat.com/en/jobs', tags: ['Java', 'Quarkus', 'Kubernetes', 'DevOps'] },
  { name: 'VMware', country: 'United States', industry: 'Cloud Software', website: 'https://careers.vmware.com', tags: ['Java', 'Spring Boot', 'Kubernetes', 'Cloud'] },
  { name: 'Broadcom (Spring)', country: 'United States', industry: 'Enterprise · Spring', website: 'https://www.broadcom.com/company/careers', tags: ['Java', 'Spring Boot', 'Kubernetes'] },
  { name: 'Twilio', country: 'United States', industry: 'Cloud Communications', website: 'https://www.twilio.com/company/jobs', tags: ['Java', 'React', 'AWS', 'Microservices'] },
  { name: 'Cloudflare', country: 'United States', industry: 'Cloud · Security', website: 'https://www.cloudflare.com/careers', tags: ['Go', 'Rust', 'React', 'Cloud'] },
  { name: 'Workday', country: 'United States', industry: 'Enterprise SaaS', website: 'https://www.workday.com/en-us/company/careers.html', tags: ['Java', 'Spring Boot', 'Cloud'] },
  { name: 'DoorDash', country: 'United States', industry: 'Food Delivery', website: 'https://careers.doordash.com', tags: ['Kotlin', 'Java', 'React', 'Microservices'] },
  { name: 'Zoom', country: 'United States', industry: 'Communications', website: 'https://careers.zoom.us', tags: ['Java', 'Spring Boot', 'React', 'Cloud'] },
  { name: 'NVIDIA', country: 'United States', industry: 'Semiconductors · AI', website: 'https://www.nvidia.com/en-us/about-nvidia/careers', tags: ['Java', 'Python', 'Cloud', 'AI/ML'] },
  // ── India — IT services & consulting ──
  { name: 'Tata Consultancy Services', country: 'India', industry: 'IT Services', website: 'https://www.tcs.com/careers', tags: ['Java', 'Spring Boot', 'Cloud', 'DevOps'] },
  { name: 'Infosys', country: 'India', industry: 'IT Services', website: 'https://www.infosys.com/careers', tags: ['Java', 'Spring Boot', 'AWS', 'Azure'] },
  { name: 'Wipro', country: 'India', industry: 'IT Services', website: 'https://careers.wipro.com', tags: ['Java', 'Spring Boot', 'Cloud', 'DevOps'] },
  { name: 'HCLTech', country: 'India', industry: 'IT Services', website: 'https://www.hcltech.com/careers', tags: ['Java', 'Spring Boot', 'Cloud', 'DevOps'] },
  { name: 'Tech Mahindra', country: 'India', industry: 'IT Services', website: 'https://careers.techmahindra.com', tags: ['Java', 'Spring Boot', 'Cloud', 'DevOps'] },
  { name: 'LTIMindtree', country: 'India', industry: 'IT Services', website: 'https://www.ltimindtree.com/careers', tags: ['Java', 'Spring Boot', 'React', 'Cloud'] },
  { name: 'Mphasis', country: 'India', industry: 'IT Services', website: 'https://www.mphasis.com/careers', tags: ['Java', 'Spring Boot', 'Cloud', 'DevOps'] },
  { name: 'Coforge', country: 'India', industry: 'IT Services', website: 'https://www.coforge.com/careers', tags: ['Java', 'Spring Boot', 'Cloud', 'Microservices'] },
  { name: 'Persistent Systems', country: 'India', industry: 'IT Services', website: 'https://www.persistent.com/careers', tags: ['Java', 'Spring Boot', 'React', 'Cloud'] },
  { name: 'Mu Sigma', country: 'India', industry: 'Analytics', website: 'https://www.mu-sigma.com', tags: ['Java', 'Python', 'AI/ML', 'Cloud'] },
  { name: 'Cognizant', country: 'India', industry: 'IT Services', website: 'https://careers.cognizant.com', tags: ['Java', 'Spring Boot', 'Cloud', 'DevOps'] },
  { name: 'Accenture', country: 'Ireland', industry: 'Consulting · IT', website: 'https://www.accenture.com/careers', tags: ['Java', 'Spring Boot', 'Azure', 'DevOps'] },
  { name: 'Capgemini', country: 'France', industry: 'IT Services', website: 'https://www.capgemini.com/careers', tags: ['Java', 'Spring Boot', 'Cloud', 'DevOps'] },
  { name: 'ThoughtWorks', country: 'India', industry: 'Consultancy', website: 'https://www.thoughtworks.com/careers', tags: ['Java', 'Spring Boot', 'React', 'DevOps'] },
  { name: 'EPAM', country: 'United States', industry: 'IT Services', website: 'https://www.epam.com/careers', tags: ['Java', 'Spring Boot', 'React', 'Cloud'] },
  { name: 'Globant', country: 'Argentina', industry: 'IT Services', website: 'https://www.globant.com/careers', tags: ['Java', 'React', 'Cloud', 'DevOps'] },
  // ── India — new-age fintech ──
  { name: 'CRED', country: 'India', industry: 'Fintech', website: 'https://careers.cred.club', tags: ['Java', 'Kotlin', 'React', 'AWS'] },
  { name: 'Razorpay', country: 'India', industry: 'Fintech', website: 'https://razorpay.com/jobs', tags: ['Java', 'Spring Boot', 'React', 'AWS'] },
  { name: 'PhonePe', country: 'India', industry: 'Fintech', website: 'https://www.phonepe.com/careers', tags: ['Java', 'Spring Boot', 'Microservices', 'Cloud'] },
  { name: 'Paytm', country: 'India', industry: 'Fintech', website: 'https://paytm.com/careers', tags: ['Java', 'Spring Boot', 'React', 'DevOps'] },
  { name: 'Groww', country: 'India', industry: 'Fintech · Investing', website: 'https://groww.in/careers', tags: ['Java', 'Spring Boot', 'React', 'AWS'] },
  { name: 'Zerodha', country: 'India', industry: 'Fintech · Trading', website: 'https://zerodha.com/careers', tags: ['Go', 'Java', 'React', 'DevOps'] },
  { name: 'Pine Labs', country: 'India', industry: 'Fintech', website: 'https://www.pinelabs.com/careers', tags: ['Java', 'Spring Boot', 'Microservices', 'Cloud'] },
  { name: 'BharatPe', country: 'India', industry: 'Fintech', website: 'https://bharatpe.com/careers', tags: ['Java', 'Spring Boot', 'React', 'AWS'] },
  { name: 'Cashfree Payments', country: 'India', industry: 'Fintech', website: 'https://www.cashfree.com/careers', tags: ['Java', 'Spring Boot', 'Microservices'] },
  { name: 'Navi', country: 'India', industry: 'Fintech', website: 'https://navi.com/careers', tags: ['Java', 'Spring Boot', 'React', 'Cloud'] },
  { name: 'slice', country: 'India', industry: 'Fintech', website: 'https://www.sliceit.com/careers', tags: ['Java', 'Kotlin', 'React', 'AWS'] },
  { name: 'Juspay', country: 'India', industry: 'Fintech · Payments', website: 'https://juspay.in/careers', tags: ['Java', 'Haskell', 'Microservices', 'Cloud'] },
  { name: 'PB Fintech (PolicyBazaar)', country: 'India', industry: 'Insurtech', website: 'https://www.policybazaar.com', tags: ['Java', 'Spring Boot', 'React', 'DevOps'] },
  // ── India — consumer / e-commerce / mobility ──
  { name: 'Flipkart', country: 'India', industry: 'E-commerce', website: 'https://www.flipkartcareers.com', tags: ['Java', 'Spring Boot', 'React', 'Microservices'] },
  { name: 'Meesho', country: 'India', industry: 'E-commerce', website: 'https://www.meesho.io/jobs', tags: ['Java', 'Spring Boot', 'React', 'Kubernetes'] },
  { name: 'Myntra', country: 'India', industry: 'Fashion E-commerce', website: 'https://careers.myntra.com', tags: ['Java', 'Spring Boot', 'React', 'Microservices'] },
  { name: 'Nykaa', country: 'India', industry: 'Beauty E-commerce', website: 'https://www.nykaa.com/careers', tags: ['Java', 'Spring Boot', 'React', 'AWS'] },
  { name: 'Swiggy', country: 'India', industry: 'Food Delivery', website: 'https://careers.swiggy.com', tags: ['Java', 'Spring Boot', 'React', 'Microservices'] },
  { name: 'Zomato', country: 'India', industry: 'Food Delivery', website: 'https://www.zomato.com/careers', tags: ['Java', 'Go', 'React', 'AWS'] },
  { name: 'Zepto', country: 'India', industry: 'Quick Commerce', website: 'https://www.zeptonow.com/careers', tags: ['Java', 'Spring Boot', 'React', 'AWS'] },
  { name: 'Blinkit', country: 'India', industry: 'Quick Commerce', website: 'https://blinkit.com/careers', tags: ['Java', 'Spring Boot', 'React', 'Microservices'] },
  { name: 'BigBasket', country: 'India', industry: 'Grocery E-commerce', website: 'https://www.bigbasket.com/careers', tags: ['Java', 'Spring Boot', 'React', 'Cloud'] },
  { name: 'Udaan', country: 'India', industry: 'B2B E-commerce', website: 'https://udaan.com/careers', tags: ['Java', 'Spring Boot', 'Microservices', 'Cloud'] },
  { name: 'Ola', country: 'India', industry: 'Mobility', website: 'https://www.olacabs.com/careers', tags: ['Java', 'Spring Boot', 'React', 'Microservices'] },
  { name: 'Ola Electric', country: 'India', industry: 'EV · Mobility', website: 'https://olaelectric.com/careers', tags: ['Java', 'React', 'Cloud', 'DevOps'] },
  { name: 'Rapido', country: 'India', industry: 'Mobility', website: 'https://www.rapido.bike/careers', tags: ['Java', 'Spring Boot', 'React', 'AWS'] },
  { name: 'MakeMyTrip', country: 'India', industry: 'Travel Tech', website: 'https://careers.makemytrip.com', tags: ['Java', 'Spring Boot', 'React', 'Microservices'] },
  { name: 'Lenskart', country: 'India', industry: 'Eyewear · Retail Tech', website: 'https://www.lenskart.com/careers', tags: ['Java', 'Spring Boot', 'React', 'Cloud'] },
  { name: 'Urban Company', country: 'India', industry: 'Home Services', website: 'https://www.urbancompany.com/careers', tags: ['Java', 'Spring Boot', 'React', 'AWS'] },
  { name: 'Delhivery', country: 'India', industry: 'Logistics', website: 'https://www.delhivery.com/careers', tags: ['Java', 'Spring Boot', 'Microservices', 'Cloud'] },
  // ── India — SaaS / product ──
  { name: 'Freshworks', country: 'India', industry: 'SaaS', website: 'https://www.freshworks.com/company/careers', tags: ['Java', 'Ruby', 'React', 'Cloud'] },
  { name: 'Zoho', country: 'India', industry: 'SaaS', website: 'https://www.zoho.com/careers', tags: ['Java', 'Spring Boot', 'React', 'Cloud'] },
  { name: 'Postman', country: 'India', industry: 'Developer Tools', website: 'https://www.postman.com/company/careers', tags: ['Node.js', 'React', 'AWS', 'Microservices'] },
  { name: 'BrowserStack', country: 'India', industry: 'Developer Tools', website: 'https://www.browserstack.com/careers', tags: ['Ruby', 'Java', 'React', 'DevOps'] },
  { name: 'Chargebee', country: 'India', industry: 'SaaS · Billing', website: 'https://www.chargebee.com/careers', tags: ['Java', 'Spring Boot', 'React', 'AWS'] },
  { name: 'Hasura', country: 'India', industry: 'Developer Tools', website: 'https://hasura.io/careers', tags: ['Haskell', 'Go', 'React', 'Kubernetes'] },
  { name: 'Druva', country: 'India', industry: 'SaaS · Data', website: 'https://www.druva.com/about/careers', tags: ['Java', 'Python', 'AWS', 'Microservices'] },
  { name: 'InMobi', country: 'India', industry: 'AdTech', website: 'https://www.inmobi.com/company/careers', tags: ['Java', 'Spring Boot', 'Cloud', 'Microservices'] },
  { name: 'Dream11', country: 'India', industry: 'Gaming · Fantasy Sports', website: 'https://www.dream11.com/careers', tags: ['Java', 'Scala', 'React', 'AWS'] },
  // ── India — edtech / health ──
  { name: 'Unacademy', country: 'India', industry: 'EdTech', website: 'https://unacademy.com/careers', tags: ['Java', 'Spring Boot', 'React', 'AWS'] },
  { name: "BYJU'S", country: 'India', industry: 'EdTech', website: 'https://byjus.com/careers', tags: ['Java', 'Spring Boot', 'React', 'Microservices'] },
  { name: 'upGrad', country: 'India', industry: 'EdTech', website: 'https://www.upgrad.com/careers', tags: ['Java', 'Spring Boot', 'React', 'Cloud'] },
  { name: 'PhysicsWallah', country: 'India', industry: 'EdTech', website: 'https://www.pw.live/careers', tags: ['Java', 'Spring Boot', 'React', 'AWS'] },
  { name: 'cult.fit', country: 'India', industry: 'Health · Fitness', website: 'https://www.cult.fit/careers', tags: ['Java', 'Spring Boot', 'React', 'AWS'] },
  { name: 'PharmEasy', country: 'India', industry: 'HealthTech', website: 'https://pharmeasy.in/careers', tags: ['Java', 'Spring Boot', 'React', 'Microservices'] },
  { name: 'Practo', country: 'India', industry: 'HealthTech', website: 'https://www.practo.com/careers', tags: ['Java', 'Spring Boot', 'React', 'Cloud'] },
  { name: 'ShareChat', country: 'India', industry: 'Social Media', website: 'https://sharechat.com/careers', tags: ['Java', 'Go', 'React', 'Kubernetes'] },
  // ── India — banks / conglomerates / telecom ──
  { name: 'Reliance Jio', country: 'India', industry: 'Telecom · Tech', website: 'https://careers.jio.com', tags: ['Java', 'Spring Boot', 'Microservices', 'Cloud'] },
  { name: 'Reliance Industries', country: 'India', industry: 'Conglomerate', website: 'https://careers.ril.com', tags: ['Java', 'Spring Boot', 'Cloud'] },
  { name: 'Bharti Airtel', country: 'India', industry: 'Telecom', website: 'https://www.airtel.in/careers', tags: ['Java', 'Spring Boot', 'Cloud', 'DevOps'] },
  { name: 'HDFC Bank', country: 'India', industry: 'Banking', website: 'https://www.hdfcbank.com/personal/about-us/careers', tags: ['Java', 'Spring Boot', 'Microservices'] },
  { name: 'ICICI Bank', country: 'India', industry: 'Banking', website: 'https://www.icicicareers.com', tags: ['Java', 'Spring Boot', 'Cloud'] },
  { name: 'Kotak Mahindra Bank', country: 'India', industry: 'Banking', website: 'https://www.kotak.com/en/careers.html', tags: ['Java', 'Spring Boot', 'React'] },
  { name: 'Axis Bank', country: 'India', industry: 'Banking', website: 'https://www.axisbank.com/careers', tags: ['Java', 'Spring Boot', 'Cloud'] },
  { name: 'Tata Motors', country: 'India', industry: 'Automotive', website: 'https://www.tatamotors.com/careers', tags: ['Java', 'Cloud', 'DevOps'] },
  { name: 'Larsen & Toubro', country: 'India', industry: 'Engineering · Tech', website: 'https://www.larsentoubro.com/careers', tags: ['Java', 'Spring Boot', 'Cloud'] },
  // ── Japan ──
  { name: 'Sony', country: 'Japan', industry: 'Electronics · Entertainment', website: 'https://www.sony.com/en/SonyInfo/Careers', tags: ['Java', 'React', 'Cloud'] },
  { name: 'Rakuten', country: 'Japan', industry: 'E-commerce', website: 'https://global.rakuten.com/corp/careers', tags: ['Java', 'Spring Boot', 'React', 'Microservices'] },
  { name: 'SoftBank', country: 'Japan', industry: 'Telecom · Investment', website: 'https://www.softbank.jp/en/recruit', tags: ['Java', 'Cloud', 'DevOps'] },
  { name: 'Toyota', country: 'Japan', industry: 'Automotive', website: 'https://global.toyota/en/careers', tags: ['Java', 'Cloud', 'DevOps'] },
  { name: 'Honda', country: 'Japan', industry: 'Automotive', website: 'https://global.honda/careers', tags: ['Java', 'Cloud', 'Microservices'] },
  { name: 'Mercari', country: 'Japan', industry: 'E-commerce', website: 'https://careers.mercari.com', tags: ['Go', 'Java', 'React', 'Kubernetes'] },
  { name: 'Fujitsu', country: 'Japan', industry: 'IT', website: 'https://www.fujitsu.com/global/about/careers', tags: ['Java', 'Spring Boot', 'Cloud'] },
  { name: 'Nintendo', country: 'Japan', industry: 'Gaming', website: 'https://www.nintendo.com/jobs', tags: ['Java', 'React', 'Cloud'] },
  // ── South Korea ──
  { name: 'Samsung', country: 'South Korea', industry: 'Electronics', website: 'https://www.samsung.com/careers', tags: ['Java', 'Spring Boot', 'React', 'Cloud'] },
  { name: 'LG', country: 'South Korea', industry: 'Electronics', website: 'https://www.lg.com/careers', tags: ['Java', 'Cloud', 'Microservices'] },
  { name: 'Naver', country: 'South Korea', industry: 'Internet · Search', website: 'https://recruit.navercorp.com', tags: ['Java', 'Spring Boot', 'React', 'Kubernetes'] },
  { name: 'Coupang', country: 'South Korea', industry: 'E-commerce', website: 'https://www.coupang.jobs', tags: ['Java', 'Spring Boot', 'React', 'AWS'] },
  { name: 'Hyundai', country: 'South Korea', industry: 'Automotive', website: 'https://www.hyundai.com/worldwide/en/careers', tags: ['Java', 'Cloud', 'DevOps'] },
  // ── China ──
  { name: 'Alibaba', country: 'China', industry: 'E-commerce · Cloud', website: 'https://careers.alibaba.com', tags: ['Java', 'Spring Boot', 'Microservices', 'Cloud'] },
  { name: 'Tencent', country: 'China', industry: 'Technology', website: 'https://careers.tencent.com', tags: ['Java', 'Go', 'React', 'Cloud'] },
  { name: 'ByteDance', country: 'China', industry: 'Technology', website: 'https://jobs.bytedance.com', tags: ['Java', 'Go', 'React', 'Microservices'] },
  { name: 'Huawei', country: 'China', industry: 'Telecom · Tech', website: 'https://www.huawei.com/en/careers', tags: ['Java', 'Cloud', 'DevOps'] },
  { name: 'Xiaomi', country: 'China', industry: 'Electronics', website: 'https://www.mi.com/global/about/careers', tags: ['Java', 'Spring Boot', 'Cloud'] },
  // ── Europe ──
  { name: 'SAP', country: 'Germany', industry: 'Enterprise Software', website: 'https://www.sap.com/about/careers.html', tags: ['Java', 'Spring Boot', 'React', 'Cloud'] },
  { name: 'Siemens', country: 'Germany', industry: 'Industrial · Software', website: 'https://www.siemens.com/global/en/company/jobs.html', tags: ['Java', 'Spring Boot', 'Cloud', 'DevOps'] },
  { name: 'Bosch', country: 'Germany', industry: 'Industrial · IoT', website: 'https://www.bosch.com/careers', tags: ['Java', 'Spring Boot', 'Cloud', 'IoT'] },
  { name: 'Zalando', country: 'Germany', industry: 'Fashion E-commerce', website: 'https://jobs.zalando.com', tags: ['Java', 'Spring Boot', 'React', 'AWS'] },
  { name: 'BMW', country: 'Germany', industry: 'Automotive', website: 'https://www.bmwgroup.jobs', tags: ['Java', 'Spring Boot', 'Cloud', 'DevOps'] },
  { name: 'Mercedes-Benz', country: 'Germany', industry: 'Automotive', website: 'https://group.mercedes-benz.com/careers', tags: ['Java', 'Spring Boot', 'AWS', 'DevOps'] },
  { name: 'Volkswagen', country: 'Germany', industry: 'Automotive', website: 'https://www.volkswagen-group.com/en/careers', tags: ['Java', 'Cloud', 'DevOps'] },
  { name: 'Deutsche Bank', country: 'Germany', industry: 'Finance', website: 'https://careers.db.com', tags: ['Java', 'Spring Boot', 'React', 'Cloud'] },
  { name: 'Spotify', country: 'Sweden', industry: 'Streaming', website: 'https://www.lifeatspotify.com', tags: ['Java', 'React', 'GCP', 'Microservices'] },
  { name: 'Klarna', country: 'Sweden', industry: 'Fintech', website: 'https://www.klarna.com/careers', tags: ['Java', 'Spring Boot', 'React', 'AWS'] },
  { name: 'Ericsson', country: 'Sweden', industry: 'Telecom', website: 'https://www.ericsson.com/careers', tags: ['Java', 'Cloud', 'Kubernetes', 'DevOps'] },
  { name: 'ASML', country: 'Netherlands', industry: 'Semiconductors', website: 'https://www.asml.com/careers', tags: ['Java', 'C++', 'Cloud', 'DevOps'] },
  { name: 'Adyen', country: 'Netherlands', industry: 'Fintech', website: 'https://careers.adyen.com', tags: ['Java', 'React', 'Microservices', 'Cloud'] },
  { name: 'Booking.com', country: 'Netherlands', industry: 'Travel Tech', website: 'https://careers.booking.com', tags: ['Java', 'React', 'Microservices', 'Cloud'] },
  { name: 'ING', country: 'Netherlands', industry: 'Finance', website: 'https://www.ing.jobs', tags: ['Java', 'Spring Boot', 'Cloud', 'DevOps'] },
  { name: 'Revolut', country: 'United Kingdom', industry: 'Fintech', website: 'https://www.revolut.com/careers', tags: ['Java', 'Kotlin', 'React', 'Microservices'] },
  { name: 'Monzo', country: 'United Kingdom', industry: 'Fintech', website: 'https://monzo.com/careers', tags: ['Go', 'Java', 'React', 'Kubernetes'] },
  { name: 'Wise', country: 'United Kingdom', industry: 'Fintech', website: 'https://www.wise.jobs', tags: ['Java', 'Spring Boot', 'React', 'AWS'] },
  { name: 'HSBC', country: 'United Kingdom', industry: 'Finance', website: 'https://www.hsbc.com/careers', tags: ['Java', 'Spring Boot', 'Cloud', 'DevOps'] },
  { name: 'Barclays', country: 'United Kingdom', industry: 'Finance', website: 'https://home.barclays/careers', tags: ['Java', 'Spring Boot', 'Microservices'] },
  { name: 'Arm', country: 'United Kingdom', industry: 'Semiconductors', website: 'https://www.arm.com/company/careers', tags: ['Java', 'Cloud', 'DevOps'] },
  { name: 'BNP Paribas', country: 'France', industry: 'Finance', website: 'https://group.bnpparibas/en/careers', tags: ['Java', 'Spring Boot', 'Cloud'] },
  // ── Rest of world ──
  { name: 'TSMC', country: 'Taiwan', industry: 'Semiconductors', website: 'https://www.tsmc.com/english/careers', tags: ['Java', 'Cloud', 'DevOps'] },
  { name: 'Shopify', country: 'Canada', industry: 'E-commerce', website: 'https://www.shopify.com/careers', tags: ['Ruby', 'React', 'Java', 'Cloud'] },
  { name: 'Atlassian', country: 'Australia', industry: 'Software', website: 'https://www.atlassian.com/company/careers', tags: ['Java', 'Spring Boot', 'React', 'AWS'] },
  { name: 'Canva', country: 'Australia', industry: 'Design Software', website: 'https://www.canva.com/careers', tags: ['Java', 'React', 'AWS', 'Microservices'] },
  { name: 'Mercado Libre', country: 'Argentina', industry: 'E-commerce', website: 'https://www.mercadolibre.com/jobs', tags: ['Java', 'Spring Boot', 'React', 'AWS'] },
  { name: 'Nubank', country: 'Brazil', industry: 'Fintech', website: 'https://international.nubank.com.br/careers', tags: ['Clojure', 'Java', 'React', 'AWS'] },
  { name: 'Grab', country: 'Singapore', industry: 'Mobility · Fintech', website: 'https://grab.careers', tags: ['Java', 'Go', 'React', 'Microservices'] },
  { name: 'Sea Group', country: 'Singapore', industry: 'Internet · Gaming', website: 'https://career.sea.com', tags: ['Java', 'Spring Boot', 'React', 'Cloud'] },
  // ── International — United States (product / SaaS / remote) ──
  { name: 'Plaid', country: 'United States', industry: 'Fintech', website: 'https://plaid.com/careers', tags: ['Java', 'Go', 'React', 'AWS'] },
  { name: 'Okta', country: 'United States', industry: 'Identity · Security', website: 'https://www.okta.com/company/careers', tags: ['Java', 'React', 'AWS', 'Microservices'] },
  { name: 'Splunk', country: 'United States', industry: 'Data · Observability', website: 'https://www.splunk.com/en_us/careers.html', tags: ['Java', 'React', 'Cloud', 'Microservices'] },
  { name: 'Dropbox', country: 'United States', industry: 'Cloud Storage', website: 'https://www.dropbox.com/jobs', tags: ['Python', 'React', 'Go', 'Cloud'] },
  { name: 'Figma', country: 'United States', industry: 'Design Software', website: 'https://www.figma.com/careers', tags: ['React', 'Node.js', 'AWS'] },
  { name: 'Notion', country: 'United States', industry: 'Productivity SaaS', website: 'https://www.notion.so/careers', tags: ['React', 'Node.js', 'AWS'] },
  { name: 'Asana', country: 'United States', industry: 'Productivity SaaS', website: 'https://asana.com/jobs', tags: ['Java', 'React', 'AWS'] },
  { name: 'Slack', country: 'United States', industry: 'Collaboration', website: 'https://slack.com/careers', tags: ['Java', 'React', 'AWS', 'Microservices'] },
  { name: 'Pinterest', country: 'United States', industry: 'Social', website: 'https://www.pinterestcareers.com', tags: ['Java', 'React', 'AWS', 'Microservices'] },
  { name: 'Lyft', country: 'United States', industry: 'Mobility', website: 'https://www.lyft.com/careers', tags: ['Go', 'Java', 'React', 'Microservices'] },
  { name: 'Instacart', country: 'United States', industry: 'Grocery Delivery', website: 'https://instacart.careers', tags: ['Ruby', 'React', 'AWS', 'DevOps'] },
  { name: 'Brex', country: 'United States', industry: 'Fintech', website: 'https://www.brex.com/careers', tags: ['Java', 'React', 'AWS', 'Microservices'] },
  { name: 'Vercel', country: 'United States', industry: 'Developer Platform', website: 'https://vercel.com/careers', tags: ['Node.js', 'React', 'Go', 'Cloud'] },
  { name: 'DigitalOcean', country: 'United States', industry: 'Cloud', website: 'https://www.digitalocean.com/careers', tags: ['Go', 'React', 'Kubernetes', 'Cloud'] },
  { name: 'Docker', country: 'United States', industry: 'Developer Tools', website: 'https://www.docker.com/careers', tags: ['Go', 'React', 'Kubernetes', 'DevOps'] },
  { name: 'Grafana Labs', country: 'United States', industry: 'Observability', website: 'https://grafana.com/about/careers', tags: ['Go', 'React', 'Kubernetes', 'DevOps'] },
  { name: 'Zapier', country: 'United States', industry: 'Automation SaaS', website: 'https://zapier.com/jobs', tags: ['Python', 'React', 'AWS', 'DevOps'] },
  { name: 'Deel', country: 'United States', industry: 'HR · Payroll SaaS', website: 'https://www.deel.com/careers', tags: ['Node.js', 'React', 'AWS', 'Microservices'] },
  // ── International — Europe ──
  { name: 'N26', country: 'Germany', industry: 'Fintech', website: 'https://n26.com/en/careers', tags: ['Java', 'Kotlin', 'React', 'AWS'] },
  { name: 'Delivery Hero', country: 'Germany', industry: 'Food Delivery', website: 'https://careers.deliveryhero.com', tags: ['Java', 'Kotlin', 'React', 'Kubernetes'] },
  { name: 'Celonis', country: 'Germany', industry: 'Process Mining', website: 'https://www.celonis.com/careers', tags: ['Java', 'Spring Boot', 'React', 'Cloud'] },
  { name: 'Personio', country: 'Germany', industry: 'HR SaaS', website: 'https://www.personio.com/careers', tags: ['Java', 'React', 'AWS'] },
  { name: 'UiPath', country: 'Romania', industry: 'Automation · RPA', website: 'https://www.uipath.com/company/careers', tags: ['React', 'Cloud', 'DevOps', 'Microservices'] },
  { name: 'Bolt', country: 'Estonia', industry: 'Mobility', website: 'https://bolt.eu/careers', tags: ['Java', 'React', 'AWS', 'Microservices'] },
  { name: 'Wolt', country: 'Finland', industry: 'Food Delivery', website: 'https://careers.wolt.com', tags: ['Kotlin', 'Java', 'React', 'Kubernetes'] },
  { name: 'Criteo', country: 'France', industry: 'AdTech', website: 'https://careers.criteo.com', tags: ['Java', 'Scala', 'React', 'Microservices'] },
  { name: 'Doctolib', country: 'France', industry: 'HealthTech', website: 'https://careers.doctolib.com', tags: ['Ruby', 'React', 'AWS', 'DevOps'] },
  { name: 'Mirakl', country: 'France', industry: 'E-commerce SaaS', website: 'https://www.mirakl.com/careers', tags: ['Java', 'Spring Boot', 'React', 'Cloud'] },
  { name: 'TomTom', country: 'Netherlands', industry: 'Maps · Location', website: 'https://www.tomtom.com/careers', tags: ['Java', 'React', 'AWS', 'Microservices'] },
  { name: 'Mollie', country: 'Netherlands', industry: 'Fintech', website: 'https://www.mollie.com/careers', tags: ['Java', 'React', 'Cloud'] },
  { name: 'Just Eat Takeaway', country: 'Netherlands', industry: 'Food Delivery', website: 'https://careers.justeattakeaway.com', tags: ['Java', 'Kotlin', 'React', 'AWS'] },
  { name: 'Skyscanner', country: 'United Kingdom', industry: 'Travel Tech', website: 'https://www.skyscanner.net/jobs', tags: ['Java', 'React', 'AWS', 'Microservices'] },
  { name: 'Deliveroo', country: 'United Kingdom', industry: 'Food Delivery', website: 'https://careers.deliveroo.co.uk', tags: ['Ruby', 'React', 'AWS', 'Kubernetes'] },
  { name: 'Checkout.com', country: 'United Kingdom', industry: 'Fintech', website: 'https://www.checkout.com/careers', tags: ['Java', 'React', 'Microservices', 'Cloud'] },
  // ── International — Israel ──
  { name: 'Wix', country: 'Israel', industry: 'Web Platform', website: 'https://www.wix.com/jobs', tags: ['Java', 'Scala', 'React', 'Cloud'] },
  { name: 'monday.com', country: 'Israel', industry: 'Work OS SaaS', website: 'https://monday.com/careers', tags: ['React', 'Node.js', 'AWS', 'Microservices'] },
  { name: 'JFrog', country: 'Israel', industry: 'DevOps', website: 'https://jfrog.com/careers', tags: ['Java', 'Spring Boot', 'DevOps', 'Kubernetes'] },
  { name: 'Snyk', country: 'Israel', industry: 'DevSecOps', website: 'https://snyk.io/careers', tags: ['Node.js', 'Go', 'React', 'Kubernetes'] },
  { name: 'Check Point', country: 'Israel', industry: 'Cybersecurity', website: 'https://www.checkpoint.com/careers', tags: ['Java', 'Cloud', 'DevOps'] },
  { name: 'AppsFlyer', country: 'Israel', industry: 'Mobile Analytics', website: 'https://www.appsflyer.com/careers', tags: ['Java', 'Scala', 'Kafka', 'Kubernetes'] },
  { name: 'Taboola', country: 'Israel', industry: 'AdTech', website: 'https://www.taboola.com/careers', tags: ['Java', 'Spring Boot', 'Kafka', 'Microservices'] },
  // ── International — Canada ──
  { name: 'Wealthsimple', country: 'Canada', industry: 'Fintech', website: 'https://www.wealthsimple.com/careers', tags: ['Ruby', 'React', 'AWS', 'DevOps'] },
  { name: 'Lightspeed', country: 'Canada', industry: 'Commerce SaaS', website: 'https://careers.lightspeedhq.com', tags: ['Java', 'React', 'AWS', 'Microservices'] },
  { name: 'OpenText', country: 'Canada', industry: 'Enterprise Software', website: 'https://careers.opentext.com', tags: ['Java', 'Spring Boot', 'Cloud'] },
  // ── International — SE Asia / Middle East / LatAm / Africa ──
  { name: 'GoTo (Gojek)', country: 'Indonesia', industry: 'Mobility · Fintech', website: 'https://www.gotocompany.com/careers', tags: ['Java', 'Go', 'React', 'Microservices'] },
  { name: 'Traveloka', country: 'Indonesia', industry: 'Travel Tech', website: 'https://www.traveloka.com/en-en/careers', tags: ['Java', 'React', 'AWS', 'Microservices'] },
  { name: 'Agoda', country: 'Thailand', industry: 'Travel Tech', website: 'https://careers.agoda.com', tags: ['Java', 'Scala', 'React', 'Kubernetes'] },
  { name: 'Shopee', country: 'Singapore', industry: 'E-commerce', website: 'https://careers.shopee.sg', tags: ['Java', 'Spring Boot', 'React', 'Microservices'] },
  { name: 'Razer', country: 'Singapore', industry: 'Gaming', website: 'https://careers.razer.com', tags: ['Java', 'React', 'Cloud'] },
  { name: 'Careem', country: 'United Arab Emirates', industry: 'Mobility · Super App', website: 'https://careem.com/careers', tags: ['Java', 'React', 'AWS', 'Microservices'] },
  { name: 'Noon', country: 'United Arab Emirates', industry: 'E-commerce', website: 'https://www.noon.com/careers', tags: ['Java', 'React', 'Cloud'] },
  { name: 'Rappi', country: 'Colombia', industry: 'Delivery · Super App', website: 'https://careers.rappi.com', tags: ['Java', 'React', 'AWS', 'Microservices'] },
  { name: 'iFood', country: 'Brazil', industry: 'Food Delivery', website: 'https://carreiras.ifood.com.br', tags: ['Java', 'Kotlin', 'React', 'Kubernetes'] },
  { name: 'PicPay', country: 'Brazil', industry: 'Fintech', website: 'https://carreiras.picpay.com', tags: ['Java', 'React', 'AWS'] },
  { name: 'Flutterwave', country: 'Nigeria', industry: 'Fintech', website: 'https://flutterwave.com/careers', tags: ['Node.js', 'React', 'AWS', 'Microservices'] },
  { name: 'Paystack', country: 'Nigeria', industry: 'Fintech', website: 'https://paystack.com/careers', tags: ['Node.js', 'React', 'AWS'] },
];

const STACK_PRIORITY = [
  'Java', 'Spring Boot', 'React', 'DevOps', 'Cloud', 'Kubernetes', 'Microservices',
  'AWS', 'GCP', 'Azure', 'Go', 'Node.js', 'Python', 'Kafka',
];

/** Distinct countries ordered by company count (for the filter chips). */
export function countryOptions(limit = 14) {
  const counts = {};
  COMPANIES.forEach((c) => {
    counts[c.country] = (counts[c.country] || 0) + 1;
  });
  const top = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([k]) => k);
  return ['All', ...top];
}

/** Stack/skill options that actually appear in the data (for the stack filter). */
export function stackOptions() {
  const present = new Set();
  COMPANIES.forEach((c) => (c.tags || []).forEach((t) => present.add(t)));
  return ['All', ...STACK_PRIORITY.filter((s) => present.has(s))];
}
