<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\BookClient;
use App\Models\Client;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RelationController extends Controller
{
    /** @var $client Client */
    private $client;
    /** @var $book   Book */
    private $book;
    /** @var $response JsonResponse */
    private $response = null;


    /***
     * Merging code blocks in an init function
     *
     * @param Request $request
     */
    public function init(Request $request)
    {
        $request->validate([
            'client_id' => 'required|integer',
            'book_id' => 'required|integer'
        ]);


        try {
            /**
             * @var $client Client
             * @var $book   Book
             */
            $this->client = Client::findOrFail($request->client_id);
            $this->book = Book::findOrFail($request->book_id);
        } catch (\Exception $exception) {
            $this->response = response()->json([
                'message' => 'Client or Book with provided ID could not be found.'
            ], 400);
        }
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function add(Request $request)
    {
        $this->init($request);
        if (!is_null($this->response)) return $this->response;

        try {
            $this->client->books()->attach($this->book->id);
        } catch (\Exception $exception) {
            return response()->json([
                'message' => 'Book is already attached to the client.'
            ], 400);
        }

        return response()->json([
            'message' => 'Attached successfully.'
        ], 200);
    }

    /***
     * @param Request $request
     * @return JsonResponse
     */
    public function delete(Request $request)
    {
        $this->init($request);
        if (!is_null($this->response)) return $this->response;

        try {
            $this->client->books()->detach($this->book->id);
        } catch (\Exception $exception) {
            return response()->json([
                'message' => 'Book is not attached to the client.'
            ], 400);
        }

        return response()->json([
            'message' => 'Detached successfully.'
        ], 200);
    }

    public function all()
    {
        $records = BookClient::getAll(5);
        return response($records, 200);
    }

    public function clients()
    {
        $clients = Client::all();
        return response()->json($clients);
    }

    public function books()
    {
        $books = Book::all();
        return response()->json($books);
    }
}
