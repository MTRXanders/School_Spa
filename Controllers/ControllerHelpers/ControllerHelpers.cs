using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace School_Spa.Controllers.ControllerHelpers
{
    public static class ControllerHelpers
    {
        public static T DiffUpdateProperties<T>(this object input, T current)
        {

            Type type = current.GetType();

            foreach (PropertyInfo p in type.GetProperties())
            {
                object currentValue = p.GetValue(current, null);

                if (input.GetType().GetProperty(p.Name) != null && !p.Name.Contains("Id"))
                {
                    object inputValue = input.GetType().GetProperty(p.Name).GetValue(input, null);

                    if (inputValue != null && !currentValue.Equals(inputValue))
                    {
                        p.SetValue(current, inputValue);
                    }
                    else
                    {
                        p.SetValue(current, currentValue);
                    }
                }
            }

            return current;
        }

        public static T CreateExampleFromDifference<T>(this object input, T current) where T : new()
        {
            Type type = current.GetType();
            var obj = new T();
            foreach (PropertyInfo p in type.GetProperties())
            {
                object currentValue = p.GetValue(current, null);

                if (input.GetType().GetProperty(p.Name) != null && !p.Name.Contains("Id"))
                {
                    object inputValue = input.GetType().GetProperty(p.Name).GetValue(input, null);

                    if (!currentValue.Equals(inputValue))
                    {
                        p.SetValue(obj, inputValue);
                    }
                    else
                    {
                        p.SetValue(obj, currentValue);
                    }
                }
            }

            return current;
        }

        public static T CreateExampleFromProp<T>(this object input) where T: new()
        {

            Type type = input.GetType();
            var obj = new T();
            foreach(PropertyInfo p in type.GetProperties())
            {
                if (obj.GetType().GetProperty(p.Name) != null && !p.Name.Contains("Id"))
                {
                   object inputValue = input.GetType().GetProperty(p.Name).GetValue(input, null);
                    p.SetValue(obj, inputValue);
                }
            }
            return obj;
        }
    }
}
