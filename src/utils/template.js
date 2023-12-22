const html = (name, token) => `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Email Verification</title>
</head>
<body style="font-family: 'Arial', sans-serif; background-color: #f8f8f8; margin: 0; padding: 0;">

<table style="max-width: 600px; margin: 20px auto; padding: 20px; background-color: #ffffff; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); border-radius: 10px; margin-top: 20px;">
    <tr>
        <td align="center">
            <img src="https://img.freepik.com/premium-vector/verification-checkmark-blue-circle-star-vector-icon-isolated-white-background_261737-745.jpg" alt="Verification Email Image" style="width: 100%; max-width: 300px; height: auto; border-radius: 10px;">
        </td>
    </tr>
    <tr>
        <td align="center">
            <h2 style="color: #333333; margin-top: 20px;">Hello ${name}!</h2>
        </td>
    </tr>
    <tr>
        <td>
            <p style="color: #666666; line-height: 1.6; font-size: 16px;">Welcome to our community! We're thrilled to have you on board. Please click <a href="http://localhost:5173/api/verify/${token}" style="color: #3498db; text-decoration: none;" target="_blank">here</a> to verify your account.</p>
        </td>
    </tr>
    <tr>
        <td align="center">
            <a href="http://localhost:5173/api/verify/${token}" style="display: inline-block; padding: 15px 30px; background-color: #3498db; color: #ffffff; text-decoration: none; border-radius: 8px; font-size: 18px;">Verify Account</a>
        </td>
    </tr>
</table>

</body>
</html>


`;
module.exports = html;
