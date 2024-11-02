const express = require('express');
const router = express.Router();
const pool = require('../config/db');

//Get element by keyname
router.get('/recipeName/:recipeName', async (req, res) => {
  const { recipeName } = req.params;

  try {
    const result = await pool.query(
      `SELECT * FROM recipes WHERE title ILIKE $1`,
      [`%${recipeName}%`]
    );

    if (result.rowCount === 0) {
        return res.status(404).json({ error: "Recipe not found" });
    }

    const recipesWithFullImagePath = result.rows.map(recipe => {
        return {
            ...recipe, 
            image: `http://127.0.0.1:3000/${recipe.image}`
        };
    });
    
        res.json(recipesWithFullImagePath);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

//Get element by id
router.get('/id/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
        const result = await pool.query(
            `SELECT r.*, i.ingredient, i.quantity, i.unit
             FROM recipes r
             LEFT JOIN ingredients i ON r.id = i.recipe_id
             WHERE r.id = $1`,
            [id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Recipe not found" });
        }

        const recipe = result.rows[0];
        recipe.image = `http://127.0.0.1:3000/${recipe.image}`;

        recipe.ingredients = result.rows.map(row => ({
            ingredient: row.ingredient,
            quantity: row.quantity,
            unit: row.unit
        })).filter(ingredient => ingredient.ingredient); // Filter out any null ingredients

        res.json(recipe);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


//Add new element
router.post('/add', async (req, res) => {
    const { image, title, description } = req.body;

    try {
        const result = await pool.query(
            `INSERT INTO recipes (image, title, description) VALUES ($1, $2, $3)`, [image, title, description]
        );
        res.status(201).json(result.rows[0]);
    } catch (err){
        console.error(err.message);
        res.status(500).send('Server error');
    }
})

//Delete element by id
router.delete('/delete/:id', async (req, res) => {
    const {id} = req.params;

    try {
        const result = await pool.query(
            `DELETE FROM recipes WHERE id = $1`, [id]
        )
        res.status(200).json({ message: "Recipe deleted successfully", deletedRecipe: result.rows[0] });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})

//Modify element by id
router.put('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { image, title, description } = req.body;

    try {
        const result = await pool.query(
            `UPDATE recipes SET image = $1, title = $2, description = $3 WHERE id = $4 RETURNING *`, 
            [image, title, description, id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Recipe not found" });
        }

        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
