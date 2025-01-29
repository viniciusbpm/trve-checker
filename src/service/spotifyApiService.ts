class SpotifyApiService {
  #clientId = '3b814cccde794130bfb43c28b3790107';
  #redirectUri = 'http://localhost:5173';

  async getCode() {
    const codeVerifier = this.#generateRandomString(64);
    const hashed = await this.#sha256(codeVerifier);
    const codeChallenge = this.#base64encode(hashed);

    const clientId = this.#clientId;
    const redirectUri = this.#redirectUri;

    const scope = 'user-read-private user-read-email';
    const authUrl = new URL('https://accounts.spotify.com/authorize');

    window.localStorage.setItem('code_verifier', codeVerifier);

    const params = {
      response_type: 'code',
      client_id: clientId,
      scope,
      code_challenge_method: 'S256',
      code_challenge: codeChallenge,
      redirect_uri: redirectUri,
    };

    authUrl.search = new URLSearchParams(params).toString();
    window.location.href = authUrl.toString();
  }

  async getToken(code: any) {
    let codeVerifier = localStorage.getItem('code_verifier');
    const url = 'https://accounts.spotify.com/api/token';

    if (codeVerifier) {
      const payload = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: this.#clientId,
          grant_type: 'authorization_code',
          code,
          redirect_uri: this.#redirectUri,
          code_verifier: codeVerifier,
        }),
      };
      
        const body = await fetch(url, payload);
        const response = await body.json();

        if(response.error) {
          throw Error
        }

        localStorage.setItem('access_token', response.access_token);
      
    }
  }

  #generateRandomString(length: number) {
    const possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], '');
  }

  async #sha256(plain: any) {
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    return window.crypto.subtle.digest('SHA-256', data);
  }

  #base64encode(input: any) {
    return btoa(String.fromCharCode(...new Uint8Array(input)))
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
  }
}

export const spotifyApiService = new SpotifyApiService();
