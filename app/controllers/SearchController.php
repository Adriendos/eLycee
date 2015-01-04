<?php

class SearchController extends Controller {

    public function search($query)
    {
        $results = Post::search($query)->getResults();
        return Response::json($results);
    }

}
