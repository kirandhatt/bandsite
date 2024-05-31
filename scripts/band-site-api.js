class BandSiteApi {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseURL = "https://unit-2-project-api-25c1595833b2.herokuapp.com/";
    }

    async postComment(comment){
        try {
            const response = await axios.post(`${this.baseURL}/comments?api_key=<${this.apiKey}>`, comment, {
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
            const response = await axios.get(`${this.baseURL}/comments?api_key=<${this.apiKey}>`, {
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
            const response = await axios.get(`${this.baseURL}/showdates?api_key=<${this.apiKey}>`, {
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
}

const apiKey = "5c6870dc-469a-4ad6-a187-0f6aac486e41";
const bandSiteApi = new BandSiteApi(apiKey);

(async() => {
    const comment = {text: "Great show!"};
    const postedComment = await bandSiteApi.postComment(comment);
    console.log('Posted comment:', postedComment);

    const comments = await bandSiteApi.getComments();
    console.log('Comments:', comments);

    const shows = await bandSiteApi.getShows();
    console.log('Shows:', shows);
})();