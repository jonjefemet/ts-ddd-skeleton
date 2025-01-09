import Config from "@config/Config";
import ErrorCategory from "@utils/constant/ErrorCategory.enum";
import Exception from "@utils/error/Exception";
import HttpStatusCode from "@utils/constant/HttpStatusCode.enum";
import { isTestEnviroment } from "@utils/helper/Stage";
import { ResponseError } from "@utils/error/ResponseError";
import CustomErrorAbstractFactory from "@utils/error/CustomErrorAbstractFactory";

class TestError extends CustomErrorAbstractFactory {
  protected readonly category = ErrorCategory.APPLICATION;

  readonly name = "TestError";
}

describe( "CustomErrorAbstractFactory", () => {

  it( "test_constructor_initializes_exceptions", () => {
    const singleException: Exception = {
      code: "E001",
      message: "Single exception"
    };
    const multipleExceptions: Exception[] = [
      {
        code: "E002",
        message: "First exception"
      },
      {
        code: "E003",
        message: "Second exception"
      }
    ];

    const errorWithSingleException = new TestError( singleException, HttpStatusCode.BAD_REQUEST );
    const errorWithMultipleExceptions = new TestError( multipleExceptions, HttpStatusCode.BAD_REQUEST );

    expect( errorWithSingleException.exceptions ).toEqual([
      singleException
    ]);
    expect( errorWithMultipleExceptions.exceptions ).toEqual( multipleExceptions );
  });
  it( "test_format_method_response_error", () => {
    const exception: Exception = {
      code: "E004",
      message: "Test exception"
    };
    const error = new TestError( exception, HttpStatusCode.INTERNAL_SERVER_ERROR );

    const isDevEnv = isTestEnviroment( Config.STAGE );
    const responseError: ResponseError = error.format();

    expect( responseError.errors ).toHaveLength( 1 );
    expect( responseError.errors[0].code ).toEqual( "E004" );
    expect( responseError.errors[0].category ).toEqual( ErrorCategory.APPLICATION );

    if ( isDevEnv ) {
      expect( responseError.errors[0].type ).toEqual( "TestError" );
      expect( responseError.errors[0].description ).toEqual( "Test exception" );
      expect( responseError.stack ).toEqual( expect.any( String ));
    } else {
      expect( responseError.errors[0].type ).toBeUndefined();
      expect( responseError.errors[0].description ).toBeUndefined();
      expect( responseError.stack ).toBeUndefined();
    }
  });
  it( "test_to_string_method_format", () => {
    const exception: Exception = {
      code: "E005",
      message: "Another test exception"
    };

    const errorPromise = new Promise(( _resolve, reject ) => {
      reject( new TestError( exception, HttpStatusCode.INTERNAL_SERVER_ERROR ));
    });

    errorPromise.catch(( error: TestError ) => {
      expect( error ).toBeInstanceOf( TestError );
      expect( error.exceptions ).toEqual([
        exception
      ]);
      const errorString = error.toString();
      expect( errorString ).toContain( "TestError" );
      expect( errorString ).toContain( error.format().stack || "" );

    });

  });

});