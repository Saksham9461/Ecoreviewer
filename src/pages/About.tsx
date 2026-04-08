import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Leaf, Target, Heart, Users, Award, Globe } from 'lucide-react';

export function About() {
  const values = [
    {
      icon: Leaf,
      title: 'Sustainability First',
      description: 'We prioritize environmental impact in every decision and recommendation.'
    },
    {
      icon: Heart,
      title: 'Community Driven',
      description: 'Built by eco-conscious consumers, for eco-conscious consumers.'
    },
    {
      icon: Award,
      title: 'Quality & Trust',
      description: 'Every product is verified for authenticity and environmental claims.'
    },
    {
      icon: Globe,
      title: 'Global Impact',
      description: 'Together, we\'re making a measurable difference for our planet.'
    },
  ];

  const team = [
    {
      name: 'Saksham Ojha',
      role: 'Developer',
      description: 'Environmental scientist passionate about sustainable living',
      image: 'https://plus.unsplash.com/premium_photo-1675793715030-0584c8ec4a13?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      name: 'Parth Makwana',
      role: 'Developer',
      description: 'Tech entrepreneur committed to eco-innovation',
      image: 'https://plus.unsplash.com/premium_photo-1675793715030-0584c8ec4a13?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      name: 'Shivam Parmar',
      role: 'Developer',
      description: 'Building connections in the eco-conscious community',
      image: 'https://plus.unsplash.com/premium_photo-1675793715030-0584c8ec4a13?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      name: 'Sanyam Mujavadia',
      role: 'Developer',
      description: 'Tech entrepreneur committed to eco-innovation',
      image: 'https://plus.unsplash.com/premium_photo-1675793715030-0584c8ec4a13?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      name: 'Maharshi Patel',
      role: 'Developer',
      description: 'Building connections in the eco-conscious community',
      image: 'https://plus.unsplash.com/premium_photo-1675793715030-0584c8ec4a13?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 to-green-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">About ECO REVIEWER</h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto">
            Empowering consumers to make informed, sustainable choices for a healthier planet
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full mb-6">
                <Target className="w-5 h-5" />
                <span className="font-semibold">Our Mission</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Making Sustainable Shopping Simple and Transparent
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                ECO REVIEWER was born from a simple belief: consumers deserve to know the true environmental impact of their purchases. In a world of greenwashing and misleading claims, we provide honest, community-driven reviews of eco-friendly products.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Our platform connects conscious consumers with verified sustainable products, helping you make choices that align with your values while supporting brands that are genuinely committed to environmental responsibility.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600"
                alt="Sustainable living"
                className="rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Core Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-xl p-6 text-center shadow-md">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <value.icon className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Meet Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Passionate individuals dedicated to sustainable living
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="h-64 w-full object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h3>
                  <p className="text-green-600 font-semibold mb-3">{member.role}</p>
                  <p className="text-gray-600">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
