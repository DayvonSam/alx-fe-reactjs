import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import data from '../data.json';

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const found = data.find(r => r.id === parseInt(id));
    setRecipe(found);
  }, [id]);

  if (!recipe) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="text-orange-600 hover:underline mb-6 inline-block">&larr; Back to Recipes</Link>
        
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <img src={recipe.image} alt={recipe.title} className="w-full h-96 object-cover" />
          
          <div className="p-8 md:p-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{recipe.title}</h1>
            
            <div className="grid md:grid-cols-2 gap-10">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Ingredients</h2>
                <ul className="space-y-2">
                  {recipe.ingredients.map((ing, i) => (
                    <li key={i} className="flex items-center text-gray-700">
                      <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                      {ing}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Instructions</h2>
                <ol className="space-y-3 text-gray-700">
                  {recipe.instructions.split('\n').map((step, i) => (
                    <li key={i} className="flex">
                      <span className="font-bold text-orange-600 mr-3">{i + 1}.</span>
                      {step.substring(step.indexOf('.') + 1).trim()}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetail;
