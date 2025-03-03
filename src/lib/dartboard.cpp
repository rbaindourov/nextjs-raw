#include <iostream>
#include <vector>
#include <cmath>
#include <algorithm>
#include <tuple>
#include <limits>

using namespace std;


// Function to calculate log of Gaussian PDF using precomputed distance
double logGaussian(double dist_sq, double sigma) {
    double sigma_sq = sigma * sigma;
    double log_constant = log(sigma * sqrt(2 * M_PI));
    return -dist_sq / (2 * sigma_sq) - log_constant;
}


vector<tuple<double, int>> dartboard(const vector<int>& A, const vector<int>& Q, int k, double sigma, const vector<vector<double>>& D) {
    vector<tuple<double, int>> results;

    for (int q_idx : Q) {
        vector<pair<double, int>> scores;

        for (int x_idx : A) {
            double dist_sq = D[x_idx][q_idx];
            double score = logGaussian(dist_sq, sigma);
           scores.push_back(make_pair(score, x_idx));
        }

        sort(scores.begin(), scores.end(), [](const pair<double, int>& a, const pair<double, int>& b) {
            return a.first > b.first;
        });


        // Select top k scores
        if (scores.size() > 0 ) {
            int top_k_size = min((int)scores.size(), k);
           double max_score = -numeric_limits<double>::infinity();
            int max_score_index = -1;
           for(int i = 0 ; i < top_k_size; ++i){
               if(scores[i].first > max_score){
                   max_score = scores[i].first;
                    max_score_index = scores[i].second;
               }
            }
          results.emplace_back(max_score, max_score_index);
        }

    }
  return results;
}

int main() {

    // Example usage:

    vector<int> A = {0, 1, 2, 3, 4}; // Indices representing data points
    vector<int> Q = {0, 2};       // Indices of query points
    int k = 2;                  // Number of nearest neighbors
    double sigma = 1.0;           // Gaussian spread

  // Example Distance Matrix (distances squared, D[i][j] is square distance between x_i,q_j)
  // This will have to be computed externally
    vector<vector<double>> D = {
      {0.0, 1.0, 4.0, 9.0, 16.0},  //distances of x_0 to every query point
      {1.0, 0.0, 1.0, 4.0, 9.0},  //distances of x_1 to every query point
      {4.0, 1.0, 0.0, 1.0, 4.0}, //distances of x_2 to every query point
      {9.0, 4.0, 1.0, 0.0, 1.0}, //distances of x_3 to every query point
      {16.0, 9.0, 4.0, 1.0, 0.0},//distances of x_4 to every query point
    };

    vector<tuple<double, int>> results = dartboard(A, Q, k, sigma, D);

    cout << "dartboard Results:" << endl;
    for (const auto& result : results) {
      cout << "Score: " << get<0>(result) << ", Index: " << get<1>(result) << endl;
    }

    return 0;
}