import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { GenerateIconForm } from "../models/generateForm.model";
import { environment } from "../../environments/environment.development";
import { Observable } from "rxjs";
import { OpenAIResponse } from "../models/image.model";

@Injectable({
  providedIn: 'root',
})
export class DalleService {
  constructor(private http: HttpClient) {}

  private dalleUrl = `https://api.openai.com/v1/images/generations`;

  generateDalleImage(generateIconForm: GenerateIconForm): Observable<OpenAIResponse> {
    const { description, color, quantity } = generateIconForm;
    
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${environment.openAI.key}`,
    };

    const body = {
      model: 'dall-e-2',
      prompt: description,
      n: quantity,
      size: '1024x1024'
    };

    return this.http.post<OpenAIResponse>(this.dalleUrl, body, { headers });
  }

}