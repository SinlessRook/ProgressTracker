// const Question = require("../models/questionModel");
const base_url = "https://leetcode.com/graphql/";
async function findName(username) {
  try {
    const response = await fetch(base_url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
      query userPublicProfile($username: String!) {
        matchedUser(username: $username) {
          profile {
            realName
          }
        }
      }
    `,
        variables: {
          username: `${username}`,
        },
        operationName: 'userPublicProfile',
      }),
    })

    const data = await response.json();
    return data.data.matchedUser.profile.realName
  } catch (error) {
    return null;
  }

}

async function findSubmissons(username) {
  try {
    const response = await fetch(base_url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
      query recentAcSubmissions($username: String!, $limit: Int!) {
        recentAcSubmissionList(username: $username, limit: $limit) {
          id
          title
          titleSlug
          timestamp
          statusDisplay
          lang
        }
      }
    `,
        variables: {
          username: `${username}`,
          limit: 20,
        },
        operationName: 'recentAcSubmissions',
      }),
    })

    const data = await response.json();
    return data.data.recentAcSubmissionList
  } catch (error) {
    return null;
  }
}

async function findProgress(submissions) {
  try {
    const progress = [];
    for (const submission of submissions) {
        progress.push({
          // question:await Question.findOne({ titleSlug: submission.titleSlug }) || null,
          titleSlug: submission.titleSlug,
          timestamp: submission.timestamp,
          submissionId: submission.id,
          status: submission.statusDisplay,
          language: submission.lang
        });
      
    }
    console.log(progress);
    return progress;
  } catch (error) {
    return null;
  }
}


module.exports = {
  findName,
  findSubmissons,
  findProgress
};
