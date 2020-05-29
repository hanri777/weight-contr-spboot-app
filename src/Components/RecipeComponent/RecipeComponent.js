import React, { Component } from 'react'
import HeaderMiniComponents from '../HeaderMiniComponent/HeaderMiniComponent'
import FooterComponent from '../FooterComponent/FooterComponent'
import './RecipeComponent.css'
import borscht from './img/borsh.jpg'
import soup from './img/CremSoup.jpg'
import pumpkin from './img/Pumpkin.jpg'
import salad from './img/Salad.jpg'

export class RecipeComponent extends Component {
  render() {
    return (
        <div className="mainRecipeDiv">
            <HeaderMiniComponents />
            <div className="containerRecipe">
                
                <div>
                    <img src={borscht} className="recipeImg" alt="Botscht"/>
                    <h3>BORSCHT</h3> 
                    <p>Borsch is one of the specialties of the Slavic peoples. 
                        Emerged in Ukraine, this first dish entered the cuisine 
                        of many neighboring peoples: Belarusians, Russians, Poles, 
                        Lithuanians, each of these peoples has its own recipe for 
                        cooking borsch. 
                    </p> 
                    <p>
                        Here we give you our recipe of Borscht, which is low in 
                        calories, but extremely flavorful.
                    </p>
                    <h4>INGRIDIENTS:</h4>
                    <ul>
                        <li>Beets – 3-4 pcs., peeled, chopped</li>
                        <li>Vegetable oil – 1 tablespoon</li>
                        <li>Carrot – 2-3 pcs., peeled, grated</li>
                        <li>Onion - 1 large pcs., chopped</li>
                        <li>Cabbage – 1-1,5kg., grated</li>
                        <li>Sweet red/green bell pepper – 1-2 pcs., chopped</li>
                        <li>Tomato – 2-3 pcs. – chopped - (can be replaced by tomato paste – 1 tablespoon)</li>
                        <li>Potatoes – 3-4 pcs., peeled, chopped</li>
                        <li>Pepper – black - to taste</li>
                        <li>Parsley fresh – 50g, chopped</li>
                        <li>Water - up to 5 liters.</li>
                    </ul>
                </div>
                <div>
                    <img src={soup} className="recipeImg" alt="CreamSoup"/>
                    <h3>CREAM SOUP</h3>
                    <p>There is a huge variety of cream soups which are known to be very healthy, low calories and very tasteful. </p>
                    <h4>INGRIDIENTS:</h4>
                    <p>This set of products is taken on a 3liter pot. </p>
                    <h4>Main ingredients are: </h4>
                    <ul>
                        <li>
                        Zucchini – 3 pcs (or pumpkin – 1kg, or broccoli – 1 pcs, or cauliflower– 1 pcs) – chopped
                        </li>
                    </ul>
                    <h4>Additional ingredients are:</h4>
                    <ul>
                        <li>Vegetable oil – 1 tablespoon</li>
                        <li>Onion - 1 large pcs.</li>
                        <li>Carrot – 4-5 pcs.</li>
                        <li>Potatoes – 3-4 pcs., peeled, chopped</li>
                        <li>Pepper – black - to taste</li>
                        <li>Coriander – 20g., chopped</li>
                        <li>Water - up to 3 liters </li>
                    </ul>
                    <h4>Preparation</h4>
                    <ol>
                        <li>
                            Making soup: add one of the abovementioned main ingredients 
                            into the pot together with the carrot, onion and potatoes and 
                            bring to the boil with 1/2liter of water. When the carrot is 
                            cooked, use immersion blender (or standard blender), puree 
                            soup until smooth. Add the rest water till 3liter.         
                        </li>
                        <li>
                            Add oil, pepper, salt coriander and cook 1 minute. 
                        </li>
                    </ol>
                    <p>Optional: You can also add fried and chopped mashrooms 
                        (150g) at the end to the cream soup.
                    </p>
                </div>
                <div>
                    <img src={salad} className="recipeImg" alt="Salad"/>
                    <h3>MIDDLE EASTERN CHOPPED SALAD</h3>
                    <p>A chopped salad is a great way to get needed vitamins
                         and minerals and to give some fresh textures to a basic meal. 
                    </p>
                    <h4>INGRIDIENTS:</h4>
                    <ul>
                        <li>Tomato – 5 pcs. – chopped</li>
                        <li>Cucumber – 1 big or 2-3 small – peeled, chopped</li>
                        <li>Bell pepper – 3 pcs. – chopped</li>
                        <li>Green onion – 30g – chopped</li>
                        <li>Red Opinion – 1 small pcs. – finely chopped</li>
                        <li>Parsley fresh – 50g, chopped</li>
                        <li>Olive oil – 1 tablespoon</li>
                        <li>Pepper – black - to taste</li>
                        <li>Salt – to taste</li>
                    </ul>
                    <h4>Preparation</h4>
                    <p>Chop the cucumbers, bell peppers, tomatoes into similar-size 
                        pieces. Add red onion to the mixture along with green onion 
                        and parsley. At the end add olive oil, pepper and salt - to taste. 
                    </p>
                    <p>Optional: You can also add cooked boneless, skinless chicken breast 
                        (2pcs), 2 tbsp. crumbled feta cheese, olives (black or green). 
                    </p>
                </div>
                <div>
                    <img src={pumpkin} className="recipeImg" alt="Pumpkin"/>
                    <h3>PUMPKIN PIE</h3>
                    <h5>For a 20cm tart tin</h5>
                    <h4>INGRIDIENTS:</h4>
                    <h4>For the pastry:</h4>
                    <ul>
                        <li>170g plain flour</li>
                        <li>Pinch of salt</li>
                        <li>100g butter</li>
                        <li>2tbsp sugar</li>
                        <li>1 egg yolk</li>
                    </ul>
                    <h4>For the pie filling:</h4>
                    <ul>
                        <li>1 small culinary pumpkin or medium butternut squash</li>
                        <li>145g maple syrup</li>
                        <li>1 tsp cinnamon</li>
                        <li>½ tsp ground ginger</li>
                        <li>2 large eggs, beaten</li>
                        <li>150ml milk</li>
                    </ul>
                    <h4>Preparation</h4>
                    <ol>
                        <li>Pre-heat the oven to 180-200C. Cut pumpkin or squash in half or quarters depending on the size, and scoop out the seeds and fibres inside. Place skin-side up in a roasting dish with a couple of tablespoons of water. Roast for about half an hour, until tender.</li>
                        <li>Take the pumpkin out and leave to cool slightly, then peel off the skin, and scoop the flesh into a food processor. Whizz until smooth, then put into a fine sieve or piece of muslin suspended over a bowl and drain for at least an hour. </li>
                        <li>Meanwhile, make pastry. Sift the flour into a mixing bowl, stir in the salt, then grate in the butter. Rub in using your fingertips until it resembles breadcrumbs, then stir through the sugar. Mix the egg yolk with 2 tbsp iced water, and sprinkle half over the mixture, then stir together with a knife until it comes together in a paste – add a little more liquid if necessary.</li>
                        <li>Bring the mixture together with your fingertips, and then roll out on a floured surface to the thickness of 5 mm. Use it to line a 20cm tart tin. Cover with clingfilm and chill for 30 minutes.</li>
                        <li>Line the pastry case with greaseproof paper and fill with baking beans. Put in the oven for 15 minutes, then remove the paper and beans, and bake for another 5-10 minutes until the base is pale golden. Remove from the oven. </li>
                        <li>Meanwhile, put 250g pumpkin purée in a large bowl, discarding the excess liquid, and stir in with spices. Taste for sweetness, then mix in the eggs. Gradually stir in the milk until you have a thick, creamy consistency – you may not need it all. Pour into the pastry case.</li>
                        <li>Bake for about 40 minutes, checking from half an hour onwards, until the filling is set, but still slightly wobbly in the centre. Allow to cool on a wire rack for at least an hour before serving.</li>
                    </ol>
                </div>
                
            </div>
            <FooterComponent />
        </div>
    )
  }
}

export default RecipeComponent
