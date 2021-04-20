<?php

namespace App\Models;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Relations\Pivot;

class BookClient extends Pivot
{
    /**
     * Indicates if the IDs are auto-incrementing.
     *
     * @var bool
     */
    public $incrementing = true;

    /**
     * Returns paginated data
     *
     * @param int $page
     * @param int $perPage
     * @return LengthAwarePaginator
     */
    public static function getAll($perPage = 5)
    {
        return self::query()
            ->orderBy('id')
            ->join('books', 'books.id', '=', 'book_id')
            ->join('clients', 'clients.id', '=', 'client_id')
            ->select('book_client.*', 'books.title', 'clients.fullname')
            ->paginate($perPage);
    }
}
