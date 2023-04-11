// function submitAddPcForm(event) {
//     event.preventDefault();
  
//     const form = event.target;
//     const formData = new FormData(form);
  
//     const pcData = {};
//     for (const [key, value] of formData.entries()) {
//       if (form[key].type === 'checkbox') {
//         pcData[key] = value === 'on' ? 1 : 0;
//       } else {
//         pcData[key] = value;
//       }
//     }
  
//     fetch('/add-pc', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(pcData),
//     })
//       .then((response) => {
//         if (response.ok) {
//           alert('PC added successfully');
//           form.reset();
//         } else {
//           response.text().then((text) => alert(text));
//         }
//       })
//       .catch((error) => {
//         console.error('Error:', error);
//         alert('Error adding PC');
//       });
//   }

// // Path: public/add-pc.js
// app.post('/add-pc', async (req, res) => {
//     if (!req.session.user) {
//       res.status(401).send('Unauthorized');
//       return;
//     }
//     const userId = req.session.user.id;
//     const pcData = req.body;
//     const keys = Object.keys(pcData);
//     const values = Object.values(pcData);
  
//     // Add user_id to the values array
//     values.unshift(userId);
  
//     const sql = `
//       INSERT INTO UserPC
//       (user_id, ${keys.join(', ')})
//       VALUES
//       (?, ${values.map(() => '?').join(', ')})
//     `;
  
//     try {
//       const [result] = await pool.query(sql, values);
//       res.status(200).send('PC added successfully');
//     } catch (err) {
//       console.error('Error adding PC:', err);
//       res.status(500).send('Error adding PC');
//     }
//   });
  