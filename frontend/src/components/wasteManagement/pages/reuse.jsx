import React, { useState, useEffect } from 'react';
import { Search, Filter, ArrowLeft, Lightbulb, Star, Clock, Wrench, Book, Heart, Recycle } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import img7 from '../../../assets/background1.png';


const ReuseIdeasPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [filteredIdeas, setFilteredIdeas] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  const categories = {
    all: { label: 'All Categories', icon: '🌍', color: 'bg-gray-100' },
    plastic: { label: 'Plastic', icon: '🥤', color: 'bg-blue-100' },
    paper: { label: 'Paper', icon: '📄', color: 'bg-yellow-100' },
    metal: { label: 'Metal', icon: '🔧', color: 'bg-gray-100' },
    clothes: { label: 'Clothes', icon: '👕', color: 'bg-pink-100' },
    polythene: { label: 'Polythene', icon: '🛍️', color: 'bg-purple-100' },
    eWaste: { label: 'E-Waste', icon: '📱', color: 'bg-red-100' },
    regiform: { label: 'Regiform', icon: '🧊', color: 'bg-cyan-100' }
  };

  const reuseIdeas = [
    // Plastic Ideas

    {
      id: 1,
      title: 'Plastic Bottle Planters',
      category: 'plastic',
      difficulty: 'easy',
      timeRequired: '15 minutes',
      materials: ['Plastic bottles', 'Soil', 'Seeds', 'Knife'],
      description: 'Transform plastic bottles into beautiful mini planters for herbs or small plants.',
      steps: ['Cut bottle in half', 'Make drainage holes', 'Add soil', 'Plant seeds'],
      tips: 'Use colorful bottles or paint them for decoration',
      rating: 4.5,
      image: '🪴'
    },
    {
      id: 2,
      title: 'Storage Containers',
      category: 'plastic',
      difficulty: 'easy',
      timeRequired: '10 minutes',
      materials: ['Large plastic containers', 'Labels', 'Markers'],
      description: 'Convert yogurt containers and food containers into organized storage solutions.',
      steps: ['Clean containers thoroughly', 'Remove old labels', 'Add new labels', 'Organize items'],
      tips: 'Great for screws, buttons, craft supplies, or garage organization',
      rating: 4.7,
      image: '📦'
    },
    {
      id: 3,
      title: 'Bird Feeder',
      category: 'plastic',
      difficulty: 'medium',
      timeRequired: '30 minutes',
      materials: ['Large plastic bottle', 'Wooden spoons', 'String', 'Bird seed'],
      description: 'Create a hanging bird feeder from a plastic bottle.',
      steps: ['Cut feeding holes', 'Insert wooden spoons', 'Add hanging string', 'Fill with seeds'],
      tips: 'Place near a window for bird watching',
      rating: 4.3,
      image: '🐦'
    },

    // Paper Ideas
    {
      id: 4,
      title: 'Paper Bags from Newspapers',
      category: 'paper',
      difficulty: 'medium',
      timeRequired: '20 minutes',
      materials: ['Old newspapers', 'Glue', 'Scissors', 'Ruler'],
      description: 'Fold newspapers into reusable paper bags for shopping or gifts.',
      steps: ['Cut newspaper to size', 'Fold into bag shape', 'Glue edges', 'Add handles'],
      tips: 'Strengthen with tape for heavier items',
      rating: 4.2,
      image: '🛍️'
    },
    {
      id: 5,
      title: 'Origami Decorations',
      category: 'paper',
      difficulty: 'easy',
      timeRequired: '10 minutes',
      materials: ['Old magazines', 'Colored paper', 'Scissors'],
      description: 'Create beautiful origami flowers and animals from old paper.',
      steps: ['Choose colorful pages', 'Follow origami patterns', 'Display creatively'],
      tips: 'Use magazine pages for colorful results',
      rating: 4.6,
      image: '🌸'
    },
    {
      id: 6,
      title: 'Seed Starting Pots',
      category: 'paper',
      difficulty: 'easy',
      timeRequired: '5 minutes',
      materials: ['Newspaper', 'Water'],
      description: 'Make biodegradable seed starting pots from newspaper.',
      steps: ['Cut newspaper squares', 'Fold into pot shape', 'Moisten slightly', 'Plant seeds'],
      tips: 'Plant directly in soil - paper decomposes naturally',
      rating: 4.8,
      image: '🌱'
    },

    // Metal Ideas
    {
      id: 7,
      title: 'Tin Can Organizers',
      category: 'metal',
      difficulty: 'easy',
      timeRequired: '15 minutes',
      materials: ['Empty cans', 'Paint', 'Labels'],
      description: 'Transform tin cans into desk organizers for pens and supplies.',
      steps: ['Clean cans thoroughly', 'Sand rough edges', 'Paint if desired', 'Label contents'],
      tips: 'Group different sizes for varied storage needs',
      rating: 4.4,
      image: '✏️'
    },
    {
      id: 8,
      title: 'Garden Wind Chimes',
      category: 'metal',
      difficulty: 'medium',
      timeRequired: '45 minutes',
      materials: ['Metal cans', 'String', 'Hammer', 'Nail', 'Paint'],
      description: 'Create musical wind chimes from aluminum cans.',
      steps: ['Clean and paint cans', 'Make holes for hanging', 'Cut to different lengths', 'Assemble with string'],
      tips: 'Different can sizes create different tones',
      rating: 4.1,
      image: '🎐'
    },

    // Clothes Ideas
    {
      id: 9,
      title: 'T-shirt Tote Bags',
      category: 'clothes',
      difficulty: 'easy',
      timeRequired: '20 minutes',
      materials: ['Old t-shirts', 'Scissors'],
      description: 'Convert old t-shirts into reusable shopping bags.',
      steps: ['Cut off sleeves', 'Cut neckline wider', 'Tie bottom fringe', 'Reinforce if needed'],
      tips: 'Thicker shirts make stronger bags',
      rating: 4.7,
      image: '👜'
    },
    {
      id: 10,
      title: 'Cleaning Rags',
      category: 'clothes',
      difficulty: 'easy',
      timeRequired: '10 minutes',
      materials: ['Old clothes', 'Scissors'],
      description: 'Cut old clothing into reusable cleaning cloths.',
      steps: ['Cut into appropriate sizes', 'Hem edges if desired', 'Store in container'],
      tips: 'Cotton materials work best for cleaning',
      rating: 4.9,
      image: '🧽'
    },
    {
      id: 11,
      title: 'Patchwork Quilts',
      category: 'clothes',
      difficulty: 'hard',
      timeRequired: 'Several hours',
      materials: ['Various fabric scraps', 'Needle', 'Thread', 'Batting'],
      description: 'Create beautiful quilts from fabric scraps and old clothes.',
      steps: ['Cut fabric into squares', 'Arrange pattern', 'Sew pieces together', 'Add batting and backing'],
      tips: 'Start with a small project like a pillow cover',
      rating: 4.5,
      image: '🧵'
    },

    // E-Waste Ideas
    {
      id: 12,
      title: 'Phone Stand from Old Cases',
      category: 'eWaste',
      difficulty: 'easy',
      timeRequired: '10 minutes',
      materials: ['Old phone cases', 'Small weights'],
      description: 'Repurpose old phone cases as phone or tablet stands.',
      steps: ['Clean case thoroughly', 'Add weight to base if needed', 'Test stability'],
      tips: 'Works great for video calls and watching content',
      rating: 4.3,
      image: '📱'
    },
    {
      id: 13,
      title: 'Cable Organizers',
      category: 'eWaste',
      difficulty: 'easy',
      timeRequired: '5 minutes',
      materials: ['Old cables', 'Labels', 'Zip ties'],
      description: 'Organize working cables and repurpose old ones as ties.',
      steps: ['Test cables for functionality', 'Label working cables', 'Use broken cables as ties'],
      tips: 'Keep one of each cable type as backup',
      rating: 4.6,
      image: '🔌'
    },

    // Polythene Ideas
    {
      id: 14,
      title: 'Waterproof Plant Covers',
      category: 'polythene',
      difficulty: 'easy',
      timeRequired: '15 minutes',
      materials: ['Large polythene bags', 'String', 'Scissors'],
      description: 'Protect plants from harsh weather using polythene bags.',
      steps: ['Clean bags thoroughly', 'Cut air holes', 'Secure over plants with string'],
      tips: 'Remove during sunny days to prevent overheating',
      rating: 4.2,
      image: '🌿'
    },
    {
      id: 15,
      title: 'Drawer Liners',
      category: 'polythene',
      difficulty: 'easy',
      timeRequired: '10 minutes',
      materials: ['Clean polythene bags', 'Scissors', 'Tape'],
      description: 'Line drawers with clean polythene for easy cleaning.',
      steps: ['Cut bags to fit drawer', 'Smooth out wrinkles', 'Secure edges with tape'],
      tips: 'Perfect for craft drawers or tool storage',
      rating: 4.0,
      image: '📁'
    },

    // Regiform Ideas
    {
      id: 16,
      title: 'Insulation Padding',
      category: 'regiform',
      difficulty: 'easy',
      timeRequired: '20 minutes',
      materials: ['Foam pieces', 'Fabric', 'Glue'],
      description: 'Use foam pieces as insulation or padding material.',
      steps: ['Cut foam to required size', 'Cover with fabric if desired', 'Place in desired location'],
      tips: 'Great for protecting stored items or insulating pet houses',
      rating: 4.1,
      image: '🏠'
    },
    {
      id: 17,
      title: 'Craft Stamps',
      category: 'regiform',
      difficulty: 'medium',
      timeRequired: '30 minutes',
      materials: ['Foam sheets', 'Craft knife', 'Handles', 'Ink pads'],
      description: 'Carve custom stamps from foam for crafting.',
      steps: ['Draw design on foam', 'Carefully cut out shape', 'Attach to handle', 'Test with ink'],
      tips: 'Start with simple shapes before attempting detailed designs',
      rating: 4.4,
      image: '🎨'
    }
  ];

  const difficultyLevels = [
    { value: 'all', label: 'All Difficulties', color: 'bg-gray-100' },
    { value: 'easy', label: 'Easy', color: 'bg-green-100' },
    { value: 'medium', label: 'Medium', color: 'bg-yellow-100' },
    { value: 'hard', label: 'Hard', color: 'bg-red-100' }
  ];

  useEffect(() => {
    let filtered = reuseIdeas;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(idea => idea.category === selectedCategory);
    }

    // Filter by difficulty
    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(idea => idea.difficulty === selectedDifficulty);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(idea =>
        idea.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        idea.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        idea.materials.some(material => material.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredIdeas(filtered);
  }, [searchTerm, selectedCategory, selectedDifficulty]);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
        ))}
        {hasHalfStar && <Star className="w-4 h-4 text-yellow-400 fill-current opacity-50" />}
        <span className="text-sm text-gray-600 ml-1">({rating})</span>
      </div>
    );
  };

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{
        backgroundImage: `url(${img7})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Dark overlay for better readability */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Custom CSS for floating animations */}
      <style jsx>{`
        /* Floating eco shapes */
        .floating { animation: float 6s ease-in-out infinite; }
        .floating:nth-child(odd) { animation-delay: -2s; }
        .floating:nth-child(even) { animation-delay: -4s; }
        @keyframes float {
          0%,100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
      `}</style>

      {/* Decorative floating elements */}
      <div className="absolute top-4 left-4 w-16 h-16 bg-green-300 rounded-full opacity-10 floating"></div>
      <div className="absolute top-12 right-8 w-8 h-8 bg-green-200 rounded-full opacity-15 floating"></div>
      <div className="absolute bottom-8 left-12 w-12 h-12 bg-green-300 rounded-full opacity-10 floating"></div>
      <div className="absolute bottom-4 right-16 w-6 h-6 bg-green-200 rounded-full opacity-20 floating"></div>

      {/* Background SVG patterns */}
      <svg className="absolute top-10 left-10 w-40 h-40 text-green-700 opacity-5 floating" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C8 6 2 9 2 15a10 10 0 0020 0c0-6-6-9-10-13z" />
      </svg>
      <svg className="absolute bottom-10 right-20 w-56 h-56 text-green-600 opacity-5 floating" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z" />
      </svg>

      {/* Header */}
      <div className="bg-white/10 backdrop-blur-md shadow-sm border-b border-white/20 relative z-10">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-green-100/20 backdrop-blur-sm flex items-center justify-center mr-3 border border-white/20">
                  <Lightbulb className="w-5 h-5" style={{ color: '#5AD670' }} />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white drop-shadow-lg">Reuse Ideas</h1>
                  <p className="text-green-200 drop-shadow-sm">Creative ways to give your items a second life</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 relative z-10">
        {/* Search and Filter Bar */}
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-lg border border-white/30 p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search ideas, materials, or descriptions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Filter Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Filter className="w-5 h-5 mr-2" />
              Filters
            </button>
          </div>

          {/* Filter Options */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              {/* Category Filter */}
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Category</h3>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(categories).map(([key, category]) => (
                    <button
                      key={key}
                      onClick={() => setSelectedCategory(key)}
                      className={`px-3 py-2 rounded-lg border-2 transition-all duration-200 text-sm ${
                        selectedCategory === key
                          ? 'border-green-500 bg-green-50 text-green-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {category.icon} {category.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Difficulty Filter */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Difficulty Level</h3>
                <div className="flex flex-wrap gap-2">
                  {difficultyLevels.map((level) => (
                    <button
                      key={level.value}
                      onClick={() => setSelectedDifficulty(level.value)}
                      className={`px-3 py-2 rounded-lg border-2 transition-all duration-200 text-sm ${
                        selectedDifficulty === level.value
                          ? 'border-green-500 bg-green-50 text-green-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {level.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-white drop-shadow-sm">
            Showing <span className="font-semibold">{filteredIdeas.length}</span> ideas
            {selectedCategory !== 'all' && (
              <span> for <span className="font-semibold">{categories[selectedCategory].label}</span></span>
            )}
          </p>
        </div>

        {/* Ideas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIdeas.map((idea) => (
            <div key={idea.id} className="bg-white/95 backdrop-blur-md rounded-2xl shadow-lg border border-white/30 overflow-hidden hover:shadow-xl hover:bg-white transition-all duration-300 hover:scale-105">
              {/* Card Header */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">{idea.image}</div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${categories[idea.category].color}`}>
                      {categories[idea.category].label}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(idea.difficulty)}`}>
                      {idea.difficulty.charAt(0).toUpperCase() + idea.difficulty.slice(1)}
                    </span>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-800 mb-2">{idea.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{idea.description}</p>

                {/* Rating and Time */}
                <div className="flex items-center justify-between mb-4">
                  {renderStars(idea.rating)}
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-1" />
                    {idea.timeRequired}
                  </div>
                </div>

                {/* Materials */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                    <Wrench className="w-4 h-4 mr-1" />
                    Materials Needed
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {idea.materials.slice(0, 3).map((material, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-xs rounded-md text-gray-600">
                        {material}
                      </span>
                    ))}
                    {idea.materials.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-xs rounded-md text-gray-600">
                        +{idea.materials.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results Message */}
        {filteredIdeas.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border border-white/30">
              <Search className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2 drop-shadow-lg">No ideas found</h3>
            <p className="text-green-200 mb-4 drop-shadow-sm">Try adjusting your search terms or filters</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSelectedDifficulty('all');
              }}
              className="px-6 py-2 text-white border border-green-400 rounded-lg hover:bg-green-400/20 transition-colors backdrop-blur-sm"
            >
              Clear Filters
            </button>
          </div>
        )}

      
      </div>
    </div>
  );
};

export default ReuseIdeasPage;