<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
	<table>
		<tr style="font-size: 22px;">
			<td>Vous avez recu un nouveau message de {{$firstname}}, {{$lastname}}</td>
		</tr>

		<tr>
			<td>Son adresse email : {{ $email }}</td>
		</tr>

		<tr>
			<td>objet du message {{ $object }}</td>
		</tr>

		<tr>
			<td>Contenu du message message de {{ $formMessage }}</td>
		</tr>
	</table>
</body>
</html>