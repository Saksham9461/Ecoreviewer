import { Leaf, Target, Heart, Users, Award } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Avatar, AvatarFallback } from './ui/avatar';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function AboutPage() {
  const team = [
    { name: 'Saksham Ojha', role: 'Developer', avatar: 'SO', bio: 'Environmental scientist passionate about sustainable living' }
  ];

  const values = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'To empower consumers to make informed, sustainable choices by providing transparent reviews and ratings of eco-friendly products.'
    },
    {
      icon: Heart,
      title: 'Our Vision',
      description: 'A world where sustainable living is the norm, and every purchase contributes to a healthier planet for future generations.'
    },
    {
      icon: Users,
      title: 'Community First',
      description: 'We believe in the power of collective action. Our community drives change through honest reviews and shared experiences.'
    },
    {
      icon: Award,
      title: 'Quality Standards',
      description: 'We maintain rigorous standards for product listings and reviews to ensure our community receives accurate, trustworthy information.'
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-accent to-secondary/20 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-6">
            <Leaf className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-5xl font-bold mb-6">About ECO REVIEWER</h1>
          <p className="text-xl text-muted-foreground">
            We're on a mission to make sustainable living accessible and inspiring for everyone.
            Together, we're creating a community that reviews green and inspires clean.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  ECO REVIEWER was born from a simple frustration: finding truly sustainable products was difficult, 
                  and understanding their real environmental impact was even harder.
                </p>
                <p>
                  In 2024, our founder Sarah Green started reviewing eco-products in her blog. The response was 
                  overwhelming. People were hungry for honest, detailed reviews of sustainable products from someone 
                  they could trust.
                </p>
                <p>
                  Today, we've grown into a thriving community of over 5,000 eco-conscious individuals who share 
                  their experiences, inspire others, and collectively drive the market toward more sustainable options.
                </p>
              </div>
            </div>
            <div>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1625409588021-8c8a6ad82d99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmUlMjBncmVlbiUyMGxlYXZlc3xlbnwxfHx8fDE3NjA0NTEyNjN8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Our story"
                className="rounded-xl shadow-lg w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-xl text-muted-foreground">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <Card key={index}>
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 rounded-full p-3 flex-shrink-0">
                      <value.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">{value.title}</h3>
                      <p className="text-muted-foreground">{value.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-xl text-muted-foreground">
              Passionate people working to make sustainable living easier
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <Avatar className="w-24 h-24 mx-auto mb-4 bg-primary">
                    <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                      {member.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold mb-1">{member.name}</h3>
                  <p className="text-sm text-primary mb-3">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '10K+', label: 'Eco Products' },
              { value: '50K+', label: 'Reviews' },
              { value: '5K+', label: 'Community Members' },
              { value: '95%', label: 'Satisfaction Rate' },
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
