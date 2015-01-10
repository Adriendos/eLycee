<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
	<table>
		<tr>
			<td style="text-align: center; padding: 40px 0;">
				<a href="#"><img src="http://i.imgur.com/4DfNqo8.png" title="Elycee" /></a>
			</td>
		</tr>
		<tr style="font-size: 22px;">
			<td>Vous avez recu un nouveau message de {{$firstname}}, {{$lastname}}</td>
		</tr>

		<tr>
			<td style="padding: 10px 30px;">
				<i>Son adresse email :</i> 
				<br>{{ $email }}
			</td>
		</tr>

		<tr>
			<td style="padding: 10px 30px;">
				<i>Objet du message :</i> 
				<br>{{ $object }}
			</td>
		</tr>

		<tr>
			<td style="padding: 10px 30px;">
				<i>Contenu du message :</i> 
				<br> {{ $formMessag
					e }}</td>
		</tr>
	</table>
</body>
</html>