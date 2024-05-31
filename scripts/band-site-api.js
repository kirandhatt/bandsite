export class BandSiteApi {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseURL = "https://unit-2-project-api-25c1595833b2.herokuapp.com";
    }

    async postComment(comment){
        try {
            const response = await axios.post(`${this.baseURL}/comments?api_key=${this.apiKey}`, comment, {
                headers: {
                    'Content-Type': `application/json`,
                    'Authorization': `Bearer ${this.apiKey}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error posting comment:', error.response ? error.response.data : error.message);
        }
    }

    async getComments() {
        try {
            const response = await axios.get(`${this.baseURL}/comments?api_key=${this.apiKey}`, {
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`
                }
            });
            let comments = response.data;

            // sort comments from new to old //
            comments.sort((a,b) => new Date(b.timestamp) - new Date (a.timestamp));
            return comments;
        } catch (error) {
            console.error('Error getting comments:', error.response ? error.response.data : error.message);
            return[];
        }
    }

    async getShows() {
        try {
            const response = await axios.get(`${this.baseURL}/showdates?api_key=${this.apiKey}`, {
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error getting shows:', error.response ? error.response.data : error.message);
            return[];
        }
    }
};