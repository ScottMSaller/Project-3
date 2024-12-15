import { GraphQLScalarType, Kind } from 'graphql';

export const DateScalar = new GraphQLScalarType({
    name: 'Date',
    description: 'Custom Date scalar type for ISO-8601 formatted dates',
    parseValue(value: unknown): Date {
      if (typeof value !== 'string') {
        throw new Error('DateScalar can only parse string values');
      }
      return new Date(value);
    },
    serialize(value: unknown): string {
      if (!(value instanceof Date)) {
        throw new Error('DateScalar can only serialize Date objects');
      }
      return value.toISOString();
    },
    parseLiteral(ast): Date | null {
      if (ast.kind === Kind.STRING) {
        return new Date(ast.value);
      }
      return null;
    },
  });