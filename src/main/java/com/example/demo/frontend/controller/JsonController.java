package com.example.demo.frontend.controller;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.view.RedirectView;

@Controller
public class JsonController {
	private final HttpClient client = HttpClient.newHttpClient();
	String cliente = "                                        ";
	String clienteEn = "                                        ";
	String clienteAl = "                                        ";

	@CrossOrigin(origins = "*")
	@PostMapping(value = "/original/json", produces = MediaType.TEXT_HTML_VALUE)
	@ResponseBody
	public String showjson(@RequestParam("name") String nome) throws IOException, InterruptedException {
		System.out.println("Dentro de original/json POST");
		cliente = nome + "                              ";
		HttpRequest req = HttpRequest.newBuilder().uri(URI.create("http://192.168.0.13:3000/CICS/CWBA/BUSCAJSO"))
				.POST(HttpRequest.BodyPublishers.ofString("name=" + cliente))
				.header("Content-Type", "application/x-www-form-urlencoded; charset=ISO-8859-1").build();

		HttpResponse<String> response = client.send(req,
				HttpResponse.BodyHandlers.ofString(StandardCharsets.ISO_8859_1));
		String body = response.body();

		return response.body();
	}

	@CrossOrigin(origins = "*")
	@GetMapping(value = "original/json", produces = MediaType.TEXT_HTML_VALUE)
	@ResponseBody
	public String showjsonORetornaPost() throws IOException, InterruptedException {
		// counter.increment(AATM004P);
		System.out.println("Dentro de original/json GET");

		HttpRequest req = HttpRequest.newBuilder().uri(URI.create("http://192.168.0.13:3000/CICS/CWBA/BUSCAJSO"))
				.POST(HttpRequest.BodyPublishers.ofString("name=" + cliente))
				.header("Content-Type", "application/x-www-form-urlencoded; charset=ISO-8859-1").build();

		HttpResponse<String> response = client.send(req,
				HttpResponse.BodyHandlers.ofString(StandardCharsets.ISO_8859_1));
		// HttpResponse.BodyHandlers.ofString(StandardCharsets.UTF_8));

		// var resposta = response.body();

		// resposta = resposta.replace('Ý', '[') ;
		// resposta = resposta.replace('¨', ']') ;
		String S = response.body().replace('Ý', '[');
		S = S.replace('¨', ']');
		return response.body();
	}

	@CrossOrigin(origins = "*")
	@PostMapping(value = "original/jsonPT", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public String showjsonO() throws IOException, InterruptedException {
		// counter.increment(AATM004P);
		System.out.println("Dentro de original/json de verdade POST");

		HttpRequest req = HttpRequest.newBuilder().uri(URI.create("http://192.168.0.13:3000/CICS/CWBA/JSON0001"))
				.POST(HttpRequest.BodyPublishers.ofString("name=" + cliente))
				.header("Content-Type", "application/x-www-form-urlencoded; charset=ISO-8859-1").build();

		HttpResponse<String> response = client.send(req,
				HttpResponse.BodyHandlers.ofString(StandardCharsets.ISO_8859_1));
		// HttpResponse.BodyHandlers.ofString(StandardCharsets.UTF_8));

		// var resposta = response.body();

		// resposta = resposta.replace('Ý', '[') ;
		// resposta = resposta.replace('¨', ']') ;
		String S = response.body().replace('Ý', '[');
		S = S.replace('¨', ']');
		return S;
	}
	@CrossOrigin(origins = "*")
	@PostMapping(value = "/json", produces = MediaType.TEXT_HTML_VALUE)
	@ResponseBody
	public String showjsonPost(@RequestParam("name") String nome) throws IOException, InterruptedException {
	//	counter.increment(AATM004P);
//		return json.showjson();
		System.out.println("Dentro de json BUSCAJSO");
		cliente = nome + "                              ";
		HttpRequest req = HttpRequest.newBuilder().uri(URI.create("http://192.168.0.13:3000/CICS/CWBA/BUSCAJSO"))
				.POST(HttpRequest.BodyPublishers.ofString("name=" + cliente))
				.header("Content-Type", "application/x-www-form-urlencoded; charset=ISO-8859-1").build();

		HttpResponse<String> response = client.send(req,
				HttpResponse.BodyHandlers.ofString(StandardCharsets.ISO_8859_1));
//				HttpResponse.BodyHandlers.ofString(StandardCharsets.UTF_8));

//		var resposta = response.body();
		
//		resposta = resposta.replace('Ý', '[') ;
//		resposta = resposta.replace('¨', ']') ;
		String S = response.body().replace('Ý', '[');
		S = S.replace('¨', ']');
		return response.body();
	}

	@CrossOrigin(origins = "*")
	@PostMapping(value = "/jsonPT", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public String showjson() throws IOException, InterruptedException {
		// counter.increment(AATM004P);
		System.out.println("Dentro de /jsonPT de verdade POST");

		HttpRequest req = HttpRequest.newBuilder().uri(URI.create("http://192.168.0.13:3000/CICS/CWBA/JSON0001"))
				.POST(HttpRequest.BodyPublishers.ofString("name=" + cliente))
				.header("Content-Type", "application/x-www-form-urlencoded; charset=ISO-8859-1").build();

		HttpResponse<String> response = client.send(req,
				HttpResponse.BodyHandlers.ofString(StandardCharsets.ISO_8859_1));
		// HttpResponse.BodyHandlers.ofString(StandardCharsets.UTF_8));

		// var resposta = response.body();

		// resposta = resposta.replace('Ý', '[') ;
		// resposta = resposta.replace('¨', ']') ;
		String S = response.body().replace('Ý', '[');
		S = S.replace('¨', ']');
		return S;
	}

	@CrossOrigin(origins = "*")
	@GetMapping("original/json, produces = MediaType.APPLICATION_JSON_VALUE")
	public String showjsonOGet() throws IOException, InterruptedException {
		// counter.increment(AATM004P);
		System.out.println("Dentro de original/json de verdade GET");

		HttpRequest req = HttpRequest.newBuilder().uri(URI.create("http://192.168.0.13:3000/CICS/CWBA/JSON0001"))
				.POST(HttpRequest.BodyPublishers.ofString("name=" + cliente))
				.header("Content-Type", "application/x-www-form-urlencoded; charset=ISO-8859-1").build();

		HttpResponse<String> response = client.send(req,
				HttpResponse.BodyHandlers.ofString(StandardCharsets.ISO_8859_1));
		// HttpResponse.BodyHandlers.ofString(StandardCharsets.UTF_8));

		// var resposta = response.body();

		// resposta = resposta.replace('Ý', '[') ;
		// resposta = resposta.replace('¨', ']') ;
		String S = response.body().replace('Ý', '[');
		S = S.replace('¨', ']');
		return response.body();

	}

	@CrossOrigin(origins = "*")
	@PostMapping(value = "/original/jsonEN", produces = MediaType.TEXT_HTML_VALUE)
	@ResponseBody
	public String showjsonEN(@RequestParam("name") String nome) throws IOException, InterruptedException {
		System.out.println("Dentro de original/jsonEN html POST");
		clienteEn = nome + "                              ";
		HttpRequest req = HttpRequest.newBuilder().uri(URI.create("http://192.168.0.13:3000/CICS/CWBA/BUSCAJSI"))
				.POST(HttpRequest.BodyPublishers.ofString("name=" + clienteEn))
				.header("Content-Type", "application/x-www-form-urlencoded; charset=ISO-8859-1").build();

		HttpResponse<String> response = client.send(req,
				HttpResponse.BodyHandlers.ofString(StandardCharsets.ISO_8859_1));
		String body = response.body();

		return response.body();
	}

	@CrossOrigin(origins = "*")
	@GetMapping(value = "original/jsonEN", produces = MediaType.TEXT_HTML_VALUE)
	@ResponseBody
	public String showjsonEnRetornaPost() throws IOException, InterruptedException {
		// counter.increment(AATM004P);
		System.out.println("Dentro de original/jsonEN html GET");

		HttpRequest req = HttpRequest.newBuilder().uri(URI.create("http://192.168.0.13:3000/CICS/CWBA/BUSCAJSI"))
				.POST(HttpRequest.BodyPublishers.ofString("name=" + clienteEn))
				.header("Content-Type", "application/x-www-form-urlencoded; charset=ISO-8859-1").build();

		HttpResponse<String> response = client.send(req,
				HttpResponse.BodyHandlers.ofString(StandardCharsets.ISO_8859_1));
		// HttpResponse.BodyHandlers.ofString(StandardCharsets.UTF_8));

		// var resposta = response.body();

		// resposta = resposta.replace('Ý', '[') ;
		// resposta = resposta.replace('¨', ']') ;
		String S = response.body().replace('Ý', '[');
		S = S.replace('¨', ']');
		return response.body();
	}

	@CrossOrigin(origins = "*")
	@PostMapping(value = "original/jsonEN", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public String showjsonENOPOST(@RequestParam("name") String nome) throws IOException, InterruptedException {
		// counter.increment(AATM004P);
		System.out.println("Dentro de original/jsonEN de verdade ingles POST");
	//	clienteEn = nome + "                              ";
		HttpRequest req = HttpRequest.newBuilder().uri(URI.create("http://192.168.0.13:3000/CICS/CWBA/JSON000I"))
				.POST(HttpRequest.BodyPublishers.ofString("name=" + clienteEn))
				.header("Content-Type", "application/x-www-form-urlencoded; charset=ISO-8859-1").build();

		HttpResponse<String> response = client.send(req,
				HttpResponse.BodyHandlers.ofString(StandardCharsets.ISO_8859_1));
		// HttpResponse.BodyHandlers.ofString(StandardCharsets.UTF_8));

		// var resposta = response.body();

		// resposta = resposta.replace('Ý', '[') ;
		// resposta = resposta.replace('¨', ']') ;
		String S = response.body().replace('Ý', '[');
		S = S.replace('¨', ']');
		return S;
	}
	@CrossOrigin(origins = "*")
	@PostMapping(value = "/jsonEN", produces = MediaType.TEXT_HTML_VALUE)
	@ResponseBody
	public String showjsonENPost(@RequestParam("name") String nome) throws IOException, InterruptedException {
	//	counter.increment(AATM004P);
//		return json.showjson();
		System.out.println("Dentro de jsonEN BUSCAJSI");
		clienteEn = nome + "                              ";
		HttpRequest req = HttpRequest.newBuilder().uri(URI.create("http://192.168.0.13:3000/CICS/CWBA/BUSCAJSI"))
				.POST(HttpRequest.BodyPublishers.ofString("name=" + clienteEn))
				.header("Content-Type", "application/x-www-form-urlencoded; charset=ISO-8859-1").build();

		HttpResponse<String> response = client.send(req,
				HttpResponse.BodyHandlers.ofString(StandardCharsets.ISO_8859_1));
//				HttpResponse.BodyHandlers.ofString(StandardCharsets.UTF_8));

//		var resposta = response.body();
		
//		resposta = resposta.replace('Ý', '[') ;
//		resposta = resposta.replace('¨', ']') ;
		String S = response.body().replace('Ý', '[');
		S = S.replace('¨', ']');
		return response.body();
	}

	@CrossOrigin(origins = "*")
	@PostMapping(value = "jsonEN", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public String showjsonENPOST() throws IOException, InterruptedException {
		// counter.increment(AATM004P);
		System.out.println("Dentro de /jsonEN de verdade ingles POST");
//		clienteEn = nome + "                              ";
		HttpRequest req = HttpRequest.newBuilder().uri(URI.create("http://192.168.0.13:3000/CICS/CWBA/JSON000I"))
				.POST(HttpRequest.BodyPublishers.ofString("name=" + clienteEn))
				.header("Content-Type", "application/x-www-form-urlencoded; charset=ISO-8859-1").build();

		HttpResponse<String> response = client.send(req,
				HttpResponse.BodyHandlers.ofString(StandardCharsets.ISO_8859_1));
		// HttpResponse.BodyHandlers.ofString(StandardCharsets.UTF_8));

		// var resposta = response.body();

		// resposta = resposta.replace('Ý', '[') ;
		// resposta = resposta.replace('¨', ']') ;
		String S = response.body().replace('Ý', '[');
		S = S.replace('¨', ']');
		return S;
	}

	@CrossOrigin(origins = "*")
	@GetMapping(value = "original/jsonEN", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public String showjsonENOGet() throws IOException, InterruptedException {
		// counter.increment(AATM004P);
		System.out.println("Dentro de original/jsonEN de verdade ingles GET");

		HttpRequest req = HttpRequest.newBuilder().uri(URI.create("http://192.168.0.13:3000/CICS/CWBA/JSON000I"))
				.POST(HttpRequest.BodyPublishers.ofString("name=" + clienteEn))
				.header("Content-Type", "application/x-www-form-urlencoded; charset=ISO-8859-1").build();

		HttpResponse<String> response = client.send(req,
				HttpResponse.BodyHandlers.ofString(StandardCharsets.ISO_8859_1));
		// HttpResponse.BodyHandlers.ofString(StandardCharsets.UTF_8));

		// var resposta = response.body();

		// resposta = resposta.replace('Ý', '[') ;
		// resposta = resposta.replace('¨', ']') ;
		String S = response.body().replace('Ý', '[');
		S = S.replace('¨', ']');
		return S;
	}

	@CrossOrigin(origins = "*")
	@PostMapping(value = "/original/jsonDE", produces = MediaType.TEXT_HTML_VALUE)
	@ResponseBody
	public String showjsonDE(@RequestParam("name") String nome) throws IOException, InterruptedException {
		System.out.println("Dentro de original/jsonDE html POST");
		clienteAl = nome + "                              ";
		HttpRequest req = HttpRequest.newBuilder().uri(URI.create("http://192.168.0.13:3000/CICS/CWBA/BUSCAJSA"))
				.POST(HttpRequest.BodyPublishers.ofString("name=" + clienteAl))
				.header("Content-Type", "application/x-www-form-urlencoded; charset=ISO-8859-1").build();

		HttpResponse<String> response = client.send(req,
				HttpResponse.BodyHandlers.ofString(StandardCharsets.ISO_8859_1));
		String body = response.body();

		return response.body();
	}

	@CrossOrigin(origins = "*")
	@GetMapping(value = "original/jsonDE", produces = MediaType.TEXT_HTML_VALUE)
	@ResponseBody
	public String showjsonDERetornaPost() throws IOException, InterruptedException {
		// counter.increment(AATM004P);
		System.out.println("Dentro de original/jsonDE html GET");

		HttpRequest req = HttpRequest.newBuilder().uri(URI.create("http://192.168.0.13:3000/CICS/CWBA/BUSCAJSA"))
				.POST(HttpRequest.BodyPublishers.ofString("name=" + clienteAl))
				.header("Content-Type", "application/x-www-form-urlencoded; charset=ISO-8859-1").build();

		HttpResponse<String> response = client.send(req,
				HttpResponse.BodyHandlers.ofString(StandardCharsets.ISO_8859_1));
		// HttpResponse.BodyHandlers.ofString(StandardCharsets.UTF_8));

		// var resposta = response.body();

		// resposta = resposta.replace('Ý', '[') ;
		// resposta = resposta.replace('¨', ']') ;
		String S = response.body().replace('Ý', '[');
		S = S.replace('¨', ']');
		return response.body();
	}

	@CrossOrigin(origins = "*")
	@GetMapping(value = "original/jsonDE", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public String showjsonDEOGet() throws IOException, InterruptedException {
		// counter.increment(AATM004P);
		System.out.println("Dentro de original/jsonDE json GET");

		HttpRequest req = HttpRequest.newBuilder().uri(URI.create("http://192.168.0.13:3000/CICS/CWBA/JSON000A"))
				.POST(HttpRequest.BodyPublishers.ofString("name=" + clienteAl))
				.header("Content-Type", "application/x-www-form-urlencoded; charset=ISO-8859-1").build();

		HttpResponse<String> response = client.send(req,
				HttpResponse.BodyHandlers.ofString(StandardCharsets.ISO_8859_1));
		// HttpResponse.BodyHandlers.ofString(StandardCharsets.UTF_8));

		// var resposta = response.body();

		// resposta = resposta.replace('Ý', '[') ;
		// resposta = resposta.replace('¨', ']') ;
		String S = response.body().replace('Ý', '[');
		S = S.replace('¨', ']');
		return S;
	}

	@CrossOrigin(origins = "*")
	@PostMapping(value = "original/jsonDE", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public String showjsonDEOPost(@RequestParam("name") String nome) throws IOException, InterruptedException {
		// counter.increment(AATM004P);
		System.out.println("Dentro de original/jsonDE json POST");
//		clienteAl = nome + "                              ";

		HttpRequest req = HttpRequest.newBuilder().uri(URI.create("http://192.168.0.13:3000/CICS/CWBA/JSON000A"))
				.POST(HttpRequest.BodyPublishers.ofString("name=" + clienteAl))
				.header("Content-Type", "application/x-www-form-urlencoded; charset=ISO-8859-1").build();

		HttpResponse<String> response = client.send(req,
				HttpResponse.BodyHandlers.ofString(StandardCharsets.ISO_8859_1));
		// HttpResponse.BodyHandlers.ofString(StandardCharsets.UTF_8));

		// var resposta = response.body();

		// resposta = resposta.replace('Ý', '[') ;
		// resposta = resposta.replace('¨', ']') ;
		String S = response.body().replace('Ý', '[');
		S = S.replace('¨', ']');
		return S;
	}
	@CrossOrigin(origins = "*")
	@PostMapping(value = "/jsonDE", produces = MediaType.TEXT_HTML_VALUE)
	@ResponseBody
	public String showjsonDEPostBusca(@RequestParam("name") String nome) throws IOException, InterruptedException {
	//	counter.increment(AATM004P);
//		return json.showjson();
		System.out.println("Dentro de jsonDE BUSCAJSA");
		clienteAl = nome + "                              ";
		HttpRequest req = HttpRequest.newBuilder().uri(URI.create("http://192.168.0.13:3000/CICS/CWBA/BUSCAJSA"))
				.POST(HttpRequest.BodyPublishers.ofString("name=" + clienteAl))
				.header("Content-Type", "application/x-www-form-urlencoded; charset=ISO-8859-1").build();

		HttpResponse<String> response = client.send(req,
				HttpResponse.BodyHandlers.ofString(StandardCharsets.ISO_8859_1));
//				HttpResponse.BodyHandlers.ofString(StandardCharsets.UTF_8));

//		var resposta = response.body();
		
//		resposta = resposta.replace('Ý', '[') ;
//		resposta = resposta.replace('¨', ']') ;
		String S = response.body().replace('Ý', '[');
		S = S.replace('¨', ']');
		return response.body();
	}

	@CrossOrigin(origins = "*")
	@PostMapping(value = "/jsonDE", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public String showjsonDEPost(@RequestParam("name") String nome) throws IOException, InterruptedException {
		// counter.increment(AATM004P);
		System.out.println("Dentro de /jsonDE json POST");
		//clienteAl = nome + "                              ";

		HttpRequest req = HttpRequest.newBuilder().uri(URI.create("http://192.168.0.13:3000/CICS/CWBA/JSON000A"))
				.POST(HttpRequest.BodyPublishers.ofString("name=" + clienteAl))
				.header("Content-Type", "application/x-www-form-urlencoded; charset=ISO-8859-1").build();

		HttpResponse<String> response = client.send(req,
				HttpResponse.BodyHandlers.ofString(StandardCharsets.ISO_8859_1));
		// HttpResponse.BodyHandlers.ofString(StandardCharsets.UTF_8));

		// var resposta = response.body();

		// resposta = resposta.replace('Ý', '[') ;
		// resposta = resposta.replace('¨', ']') ;
		String S = response.body().replace('Ý', '[');
		S = S.replace('¨', ']');
		return S;
	}

}
